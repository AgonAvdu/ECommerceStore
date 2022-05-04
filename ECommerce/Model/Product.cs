using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerce.Model
{
    public class Product
    {
        public int id { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public string imgUrl { get; set; }
        public int userId { get; set; }
        public float rating { get; set; }
        public float price { get; set; }
        public float sale { get; set; }
        public int categoryId { get; set; }
        public string dateCreated { get; set; }
        public string dateEdited { get; set; }



    }
}
