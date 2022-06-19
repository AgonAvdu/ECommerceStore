using ECommerce.Data;
using ECommerce.DTOs;
using ECommerce.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerce.Controllers
{
    public class CartController : BaseApiController
    {
        private readonly StoreContext _context;
        
        public CartController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet(Name = "GetCart")]
        public async Task<ActionResult<CartDTO>> GetCart()
        {
            var cart = await RetrieveCart();
            if (cart == null) return NotFound();
            return MapCartToDto(cart);
        }

       

        [HttpPost]
        public async Task<ActionResult<CartDTO>> AddItemToCart(int productId, int quantity)
        {
            var cart = await RetrieveCart();

            if (cart == null) cart = CreateCart();
            
            var product = await _context.Products.FindAsync(productId);
            
            if (product == null) return NotFound();
            
            cart.AddItem(product, quantity);

            var result = await _context.SaveChangesAsync() > 0;

            if(result) return CreatedAtRoute("GetCart", MapCartToDto(cart));

            return BadRequest(new ProblemDetails { Title = "Problem saving item to cart" });

        }

        

        [HttpDelete]
        public async Task<ActionResult> RemoveCartItem(int productId, int quantity)
        {
            var cart = await RetrieveCart();
            if (cart == null) return NotFound();
            cart.RemoveItem(productId, quantity);
            var result = await _context.SaveChangesAsync() > 0;
            if(result) return Ok();

            return BadRequest(new ProblemDetails { Title = "Problem removing item from basket" });
        }

        private async Task<Cart> RetrieveCart()
        {
            return await _context.Carts
                            .Include(i => i.items)
                            .ThenInclude(p => p.Product)
                            .FirstOrDefaultAsync(x => x.buyerId == Request.Cookies["buyerId"]);
        }
        private Cart CreateCart()
        {
            var BuyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
            Response.Cookies.Append("buyerId", BuyerId, cookieOptions);
            var cart = new Cart { buyerId = BuyerId };
            _context.Carts.Add(cart);
            return cart;
        }
        private CartDTO MapCartToDto(Cart cart)
        {
            return new CartDTO
            {
                id = cart.id,
                buyerId = cart.buyerId,
                items = cart.items.Select(item => new CartItemDTO
                {
                    productId = item.productId,
                    name = item.Product.name,
                    price = item.Product.price,
                    imgUrl = item.Product.imgUrl,
                    sale = item.Product.sale,
                    categoryId = item.Product.categoryId,
                    quantity = item.quantity,

                }).ToList()

            };
        }
    }
}
