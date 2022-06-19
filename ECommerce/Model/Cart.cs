using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerce.Model
{
    public class Cart
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int id { get; set; }
        public string buyerId { get; set; }
        public List<CartItem> items { get; set; } = new List<CartItem>();

        public void AddItem(Product product, int quantity)
        {
            if (items.All(item => item.productId != product.id))
            {
                items.Add(new CartItem { Product = product, quantity = quantity });
            }
            var existingItem = items.FirstOrDefault(item => item.productId == product.id);
            if (existingItem != null) existingItem.quantity += quantity;
        }

        public void RemoveItem(int productId, int quantity)
        {
            var item = items.FirstOrDefault(item => item.productId == productId);
            if (item == null) return;
            item.quantity -= quantity;
            if (item.quantity == 0) items.Remove(item);
        }

    }
}

