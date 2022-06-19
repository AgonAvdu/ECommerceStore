

using ECommerce.Model;
using System.Collections.Generic;
using System.Linq;

namespace ECommerce.Data
{
    public static class DbInitializer
    {
        public static void Initialize(StoreContext context) {
            if(context.Roles.Any()) return;

           var roles = new List<Role>
            {
                new Role
                {
                    name = "ADMIN",
                    
                },
                new Role
                {
                    name = "USER",
              
                }
            };

            foreach(var role in roles) {
                context.Roles.Add(role);
            }

            context.SaveChanges();
        }    
    }
}