using ECommerce.DTOs;
using ECommerce.Model.OrderAggregate;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerce.Extensions
{
    public static class OrderExtensions
    {
        public static IQueryable<OrderDTO> ProjectOrderToOrderDto(this IQueryable<Order> query)
        {
            return query
                .Select(order => new OrderDTO
                {
                    id = order.Id,
                    buyerId = order.BuyerId,
                    orderDate = order.OrderDate,
                    shippingAddress = order.ShippingAddress,
                    deliveryFee = order.DeliveryFee,
                    subtotal = order.Subtotal,
                    orderStatus = order.OrderStatus.ToString(),
                    total = order.GetTotal(),
                    orderItems = order.OrderItems.Select(item => new OrderItemDTO
                    {
                        productId = item.ItemOrdered.productId,
                        name = item.ItemOrdered.name,
                        imgUrl = item.ItemOrdered.imgURL,
                        price = item.Price,
                        sale = item.Sale,
                        quantity = item.Quantity
                    }).ToList()
                }).AsNoTracking();
        }
    }
}
