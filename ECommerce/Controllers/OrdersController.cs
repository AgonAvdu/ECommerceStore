using ECommerce.Data;
using ECommerce.DTOs;
using ECommerce.Extensions;
using ECommerce.Model;
using ECommerce.Model.OrderAggregate;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerce.Controllers
{
    [Authorize]
    public class OrdersController : BaseApiController
    {
        public StoreContext _context { get; }
        public OrdersController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<OrderDTO>>> GetOrders()
        {
            return await _context.Orders
                .ProjectOrderToOrderDto()
                .Where(x => x.buyerId == User.Identity.Name)
                .ToListAsync();
        }

        [HttpGet("{id}", Name = "GetOrder")]
        public async Task<ActionResult<OrderDTO>> GetOrder(int id)
        {
            return await _context.Orders
                .ProjectOrderToOrderDto()
                .Where(x => x.buyerId == User.Identity.Name && x.id == id)
                .FirstOrDefaultAsync();
        }

        [HttpPost]
        public async Task<ActionResult<int>> CreateOrder(CreateOrderDTO orderDto)
        {
            var cart = await _context.Carts
                .RetrieveCartWithItems(User.Identity.Name)
                .FirstOrDefaultAsync();

            if (cart == null) return BadRequest(new ProblemDetails { Title = "Could not locate cart" });

            var items = new List<OrderItem>();

            foreach (var item in cart.items)
            {
                var productItem = await _context.Products.FindAsync(item.productId);
                var itemOrdered = new ProductItemOrdered
                {
                    productId = productItem.id,
                    name = productItem.name,
                    imgURL = productItem.imgUrl
                };
                var orderItem = new OrderItem
                {
                    ItemOrdered = itemOrdered,
                    Price = productItem.price,
                    Sale = productItem.sale,
                    Quantity = item.quantity

                };
                items.Add(orderItem);
                productItem.quantityInStock -= item.quantity;
            }

            var subtotal = items.Sum(item => ( item.Price * (1 - (item.Sale / 100)) * item.Quantity));
            var deliverFee = subtotal > 100 ? 0 : 5;

            var order = new Order
            {
                OrderItems = items,
                BuyerId = User.Identity.Name,
                ShippingAddress = orderDto.ShippingAddress,
                Subtotal = subtotal,
                DeliveryFee = deliverFee,
                PaymentIntentId = cart.PaymentIntentId,

      
            };

            _context.Orders.Add(order);
            _context.Carts.Remove(cart);

            if(orderDto.SaveAddress)
            {
                var user =  await _context.Users
                    .Include(a => a.Address)
                    .FirstOrDefaultAsync(x => x.UserName == User.Identity.Name);
                user.Address = new UserAddress
                {
                    FullName = orderDto.ShippingAddress.FullName,
                    Address1 = orderDto.ShippingAddress.Address1,
                    Address2 = orderDto.ShippingAddress.Address2,
                    City = orderDto.ShippingAddress.City,
                    Country = orderDto.ShippingAddress.Country,
                    Zip = orderDto.ShippingAddress.Zip,

                };
                

                
            }
            var result = await _context.SaveChangesAsync() > 0;
            if (result) return CreatedAtRoute("GetOrder", new { id = order.Id }, order.Id);

            return BadRequest("Problem creating order");
        }

    }
}
