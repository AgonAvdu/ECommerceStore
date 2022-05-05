using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerce.Model
{
    public class Product
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int id { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public string imgUrl { get; set; }
        [Required]
        public int userId { get; set; }
        [ForeignKey("userId")]
        public virtual User User { get; set; }

        public float rating { get; set; }
        public float price { get; set; }
        public float sale { get; set; }
        [Required]
        public int categoryId { get; set; }
        [ForeignKey("categoryId")]
        public virtual Category Category { get; set; }
        public string dateCreated { get; set; }
        public string dateEdited { get; set; }



    }
}
