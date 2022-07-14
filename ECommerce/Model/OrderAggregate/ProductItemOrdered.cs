using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerce.Model.OrderAggregate
{   
    [Owned]
    public class ProductItemOrdered
    {
        public int productId { get; set; }
        public string name { get; set; }
        public string imgURL { get; set; }

    }
}
