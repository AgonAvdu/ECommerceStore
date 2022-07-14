using ECommerce.Model.OrderAggregate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerce.DTOs
{
    public class OrderDTO
    {
        public int id { get; set; }
        public string buyerId { get; set; }
        public ShippingAddress shippingAddress { get; set; }
        public DateTime orderDate { get; set; }
        public List<OrderItemDTO> orderItems { get; set; }

        public double subtotal { get; set; }
        public double deliveryFee { get; set; }
        public string orderStatus { get; set; }

        public double total { get; set; }
    }
}
