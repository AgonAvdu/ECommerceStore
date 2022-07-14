

using ECommerce.Model;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerce.Data
{
    public static class DbInitializer
    {
        public static async Task Initialize(StoreContext context, UserManager<User> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new User
                {
                    UserName = "Filan",
                    Email = "filan@gmail.com"
                };
                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, "User");
                var admin = new User
                {
                    UserName = "Agon",
                    Email = "ggoni2002@gmail.com"
                };
                await userManager.CreateAsync(admin, "Pa$$w0rd");
                await userManager.AddToRolesAsync(admin, new[] { "User", "Admin" });
            }
            if (!context.Categories.Any())
            {
                var categories = new List<Category>
                {
                    new Category
                    {
                        name = "Phone",
                    },
                    new Category
                    {
                        name = "Mobile",
                    },
                };
                foreach (var category in categories)
                {
                    context.Categories.Add(category);
                }

                if (!context.Products.Any())
                {
                    var products = new List<Product>
            {
                new Product
                {
                    name = "Angular Speedster Board 2000",
                    description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    imgUrl = "sb-ang1.png",
                    price = 20,
                    categoryId = 1,
                    rating = 5,
                    sale = 10,
                    dateCreated = DateTime.Now.ToString(),
                    dateEdited = DateTime.Now.ToString(),
                    quantityInStock = 100
                },
                new Product
                {
                    name = "Green Angular Board 3000",
                    description = "Nunc viverra imperdiet enim. Fusce est. Vivamus a tellus.",
                    price = 150,
                    imgUrl = "sb-ang2.png",
                    categoryId = 2,
                    rating = 4,
                    sale = 5,

                    dateCreated = DateTime.Now.ToString(),
                    dateEdited = DateTime.Now.ToString(),
                    quantityInStock = 100
                },
                new Product
                {
                    name = "Core Board Speed Rush 3",
                    description =
                        "Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.",
                    price = 180,
                    imgUrl = "sb-core1.png",
                    categoryId = 1,
                    rating = 3,
                    sale = 0,

                    dateCreated = DateTime.Now.ToString(),
                    dateEdited = DateTime.Now.ToString(),
                    quantityInStock = 100
                },
                new Product
                {
                    name = "Net Core Super Board",
                    description =
                        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci.",
                    price = 30,
                    imgUrl = "sb-core2.png",
                    categoryId = 2,
                    rating = 2,
                    sale = 10,

                    dateCreated = DateTime.Now.ToString(),
                    dateEdited = DateTime.Now.ToString(),
                    quantityInStock = 100
                },
                new Product
                {
                    name = "React Board Super Whizzy Fast",
                    description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    price = 250,
                    imgUrl = "sb-react1.png",
                    categoryId = 1,
                    rating = 1,
                    sale = 5,

                    dateCreated = DateTime.Now.ToString(),
                    dateEdited = DateTime.Now.ToString(),
                    quantityInStock = 100
                },
                new Product
                {
                    name = "ratingscript Entry Board",
                    description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    price = 1200,
                    imgUrl = "sb-ts1.png",
                    categoryId = 2,
                    rating = 5,
                    sale = 0,

                    dateCreated = DateTime.Now.ToString(),
                    dateEdited = DateTime.Now.ToString(),
                    quantityInStock = 100
                },
                new Product
                {
                    name = "Core Blue Hat",
                    description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    price = 1,
                    imgUrl = "hat-core1.png",
                    categoryId = 1,
                    rating = 4,
                    sale = 10,

                    dateCreated = DateTime.Now.ToString(),
                    dateEdited = DateTime.Now.ToString(),
                    quantityInStock = 100
                },
                new Product
                {
                    name = "Green React Woolen Hat",
                    description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    price = 80,
                    imgUrl = "hat-react1.png",
                    categoryId = 2,
                    rating = 3,
                    dateCreated = DateTime.Now.ToString(),
                    dateEdited = DateTime.Now.ToString(),
                    quantityInStock = 100,
                    sale = 10,

                },
                new Product
                {
                    name = "Purple React Woolen Hat",
                    description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    price = 150,
                    imgUrl = "hat-react2.png",
                    categoryId = 1,
                    rating = 2,
                    sale = 5,

                    dateCreated = DateTime.Now.ToString(),
                    dateEdited = DateTime.Now.ToString(),
                    quantityInStock = 100
                },
                new Product
                {
                    name = "Blue Code Gloves",
                    description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    price = 180,
                    sale = 0,

                    imgUrl = "glove-code1.png",
                    categoryId = 2,
                    rating = 1,
                    dateCreated = DateTime.Now.ToString(),
                    dateEdited = DateTime.Now.ToString(),
                    quantityInStock = 100
                },
                new Product
                {
                    name = "Green Code Gloves",
                    description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    price = 150,
                    sale = 5,

                    imgUrl = "glove-code2.png",
                    categoryId = 1,
                    rating = 5,
                    dateCreated = DateTime.Now.ToString(),
                    dateEdited = DateTime.Now.ToString(),
                    quantityInStock = 100
                },
                new Product
                {
                    name = "Purple React Gloves",
                    description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    price = 100,
                    sale = 5,

                    imgUrl = "glove-react1.png",
                    categoryId = 2,
                    rating = 4,
                    dateCreated = DateTime.Now.ToString(),
                    dateEdited = DateTime.Now.ToString(),
                    quantityInStock = 100
                },
                new Product
                {
                    name = "Green React Gloves",
                    description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    price = 10,
                    imgUrl = "glove-react2.png",
                    categoryId = 1,
                    sale = 5,

                    rating = 3,
                    dateCreated = DateTime.Now.ToString(),
                    dateEdited = DateTime.Now.ToString(),
                    quantityInStock = 100
                },
                new Product
                {
                    name = "Redis Red Boots",
                    description =
                        "Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.",
                    price = 250,
                    sale = 15,

                    imgUrl = "boot-redis1.png",
                    categoryId = 2,
                    rating = 2,
                    dateCreated = DateTime.Now.ToString(),
                    dateEdited = DateTime.Now.ToString(),
                    quantityInStock = 100
                },
                new Product
                {
                    name = "Core Red Boots",
                    description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    price = 189,
                    sale = 10,

                    imgUrl = "boot-core2.png",
                    categoryId = 1,
                    rating = 1,
                    dateCreated = DateTime.Now.ToString(),
                    dateEdited = DateTime.Now.ToString(),
                    quantityInStock = 100
                },
                new Product
                {
                    name = "Core Purple Boots",
                    description =
                        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci.",
                    price = 199.50,
                    sale = 10,

                    imgUrl = "boot-core1.png",
                    categoryId = 2,
                    rating = 5,
                    dateCreated = DateTime.Now.ToString(),
                    dateEdited = DateTime.Now.ToString(),
                    quantityInStock = 100
                },
                new Product
                {
                    name = "Angular Purple Boots",
                    description = "Aenean nec lorem. In porttitor. Donec laoreet nonummy augue.",
                    price = 150,
                    sale = 10,

                    imgUrl = "boot-ang2.png",
                    categoryId = 1,
                    rating = 4,
                    dateCreated = DateTime.Now.ToString(),
                    dateEdited = DateTime.Now.ToString(),
                    quantityInStock = 100
                },
                new Product
                {
                    name = "Angular Blue Boots",
                    description =
                        "Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.",
                    price = 1800,
                    sale = 10,

                    imgUrl = "boot-ang1.png",
                    categoryId = 2,
                    rating = 3,
                    dateCreated = DateTime.Now.ToString(),
                    dateEdited = DateTime.Now.ToString(),
                    quantityInStock = 100
                },
            };

               foreach (var product in products)
                    {
                        context.Products.Add(product);
                    }
                }






                context.SaveChanges();
            }
        }
    }
}