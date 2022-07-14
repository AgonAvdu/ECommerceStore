using ECommerce.Model;
using ECommerce.Model.OrderAggregate;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ECommerce.Data
{
    public class StoreContext : IdentityDbContext<User, Role, int>
    {

        public StoreContext()
        {
        }

        public StoreContext(DbContextOptions<StoreContext> options): base(options)
        { 
        }





        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories{ get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<Order> Orders { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<User>()
                .HasOne(a => a.Address)
                .WithOne()
                .HasForeignKey<UserAddress>(a => a.Id)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Role>()
                .HasData(
                    new Role {Id = 1, Name = "User", NormalizedName = "USER" },
                    new Role {Id = 2, Name = "Admin", NormalizedName = "ADMIN" }
                );
        }



    }
}
