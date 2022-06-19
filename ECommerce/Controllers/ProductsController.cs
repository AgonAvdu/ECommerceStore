using System.Collections.Generic;
using System.Threading.Tasks;
using ECommerce.Data;
using ECommerce.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using System.Linq;
using ECommerce.Extensions;
using ECommerce.RequestHelpers;
using System.Text.Json;

namespace ECommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : BaseApiController
    {
        private readonly StoreContext _context;
        public ProductsController(StoreContext context)
        { 
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery]ProductParams productParams)
        {
            var query = _context.Products
                .Sort(productParams.OrderBy)
                .Search(productParams.SearchTerm)
                .Filter(productParams.Categories, productParams.Users)
                .AsQueryable();


            var products = await PagedList<Product>.toPagedList(query, 
                productParams.PageNumber, productParams.PageSize);

            Response.AddPaginationHeader(products.MetaData);

            return products;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            return await _context.Products.FindAsync(id);
        }
        
    [HttpGet("filters")]

    public async Task<IActionResult> GetFilers()
    {
        var categories = await _context.Products.Select(p => p.categoryId).Distinct().ToListAsync();
        var users = await _context.Products.Select(p => p.userId).Distinct().ToListAsync();

            return Ok(new { categories, users });    
    }

    }

}