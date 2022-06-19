using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ECommerce.Model
{
    [Table("CartItems")]
    public class CartItem
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int id { get; set; }
        public int quantity { get; set; }
         
        public int productId { get; set; }
        public Product Product { get; set; }

        public int cartId { get; set; }
        public Cart Cart { get; set; }


    }
}