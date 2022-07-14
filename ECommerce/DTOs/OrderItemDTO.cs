using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerce.DTOs
{
    public class OrderItemDTO
    {
        public int productId { get; set; }
        public string name { get; set; }
        public string imgUrl { get; set; }
        public double price { get; set; }
        public int sale { get; set; }
        public int quantity { get; set; }

    }
}
