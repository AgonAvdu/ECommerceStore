using ECommerce.DTOs;
using ECommerce.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerce.Extensions
{
    public static class CartExtensions
    {
        public static CartDTO MapCartToDto(this Cart cart)
        {
            return new CartDTO
            {
                id = cart.id,
                buyerId = cart.buyerId,
                PaymentIntentId = cart.PaymentIntentId,
                ClientSecret = cart.ClientSecret,
                items = cart.items.Select(item => new CartItemDTO
                {
                    productId = item.productId,
                    name = item.Product.name,
                    price = item.Product.price,
                    imgUrl = item.Product.imgUrl,
                    sale = item.Product.sale,
                    categoryId = item.Product.categoryId,
                    productQuantity = item.Product.quantityInStock,
                    quantity = item.quantity,

                }).ToList()

            };
        }
        public static IQueryable<Cart> RetrieveCartWithItems(this IQueryable<Cart> query, string buyerId)
        {
            return query
                .Include(i => i.items)
                .ThenInclude(p => p.Product)
                .Where(b => b.buyerId == buyerId);
        }
    }
}
