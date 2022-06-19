

using System.Collections.Generic;

namespace ECommerce.DTOs
{
    public class CartDTO
    {
        public int id{ get; set; }
        public string buyerId { get; set; }
        public List<CartItemDTO> items { get; set; }
    }
}
