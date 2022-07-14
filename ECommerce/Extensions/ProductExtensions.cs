

using ECommerce.Model;
using System.Collections.Generic;
using System.Linq;

namespace ECommerce.Extensions
{
    public static class ProductExtensions
    {
        public static IQueryable<Product> Sort(this IQueryable<Product> query, string orderBy) {

            if (string.IsNullOrWhiteSpace(orderBy)) return query.OrderBy(p => p.name);

            query = orderBy switch
            {
                "price" => query.OrderBy(p => p.price),
                "priceDesc" => query.OrderByDescending(p => p.price),
                _ => query.OrderBy(p => p.name)
            };
            return query;
        }
        public static IQueryable<Product> Search(this IQueryable<Product> query, string searchTerm)
        {

            if (string.IsNullOrWhiteSpace(searchTerm)) return query;

            var loverCaseSearchTerm = searchTerm.Trim().ToLower();

            return query.Where(p => p.name.ToLower().Contains(loverCaseSearchTerm));
        }
        public static IQueryable<Product> Filter(this IQueryable<Product> query, string categoriesId)
        {

            var categoryList = new List<string>();


            if (!string.IsNullOrEmpty(categoriesId))
                categoryList.AddRange(categoriesId.Split(",").ToList());
            

            query = query.Where(p => categoryList.Count == 0 || categoryList.Contains(p.categoryId.ToString()));

            return query;

        }

    }
    
}
