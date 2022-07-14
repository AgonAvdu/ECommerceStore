using ECommerce.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerce.Data
{
    public class StoreContext : DbContext
    {

        public StoreContext()
        {
        }

        public StoreContext(DbContextOptions<StoreContext> options): base(options)
        { 
        }





        public DbSet<Role> Roles { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories{ get; set; }

        public DbSet<Cart> Carts { get; set; }


    }
}
