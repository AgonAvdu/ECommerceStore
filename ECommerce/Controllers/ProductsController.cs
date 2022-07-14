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
using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Authorization;
using ECommerce.DTOs;
using ECommerce.Services;

namespace ECommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : BaseApiController
    {
        private readonly StoreContext _context;
        private readonly IMapper _mapper;
        private readonly ImageService _imageService;

        public ProductsController(StoreContext context, IMapper mapper, ImageService imageService)
        { 
            _context = context;
            _mapper = mapper;
            _imageService = imageService;
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery]ProductParams productParams)
        {
            var query = _context.Products
                .Sort(productParams.OrderBy)
                .Search(productParams.SearchTerm)
                .Filter(productParams.Categories)
                .AsQueryable();


            var products = await PagedList<Product>.toPagedList(query, 
                productParams.PageNumber, productParams.PageSize);

            Response.AddPaginationHeader(products.MetaData);

            return products;
        }

        [HttpGet("{id}", Name = "GetProduct")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null) return NotFound();
            return product;
        }
        
    [HttpGet("filters")]

    public async Task<IActionResult> GetFilers()
    {
        var categories = await _context.Products.Select(p => p.categoryId).Distinct().ToListAsync();

            return Ok(new { categories});    
    }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct([FromForm]CreateProductDTO productDto)
        {
            var product = _mapper.Map<Product>(productDto);

            if (productDto.file != null)
            {
                var imageResult = await _imageService.AddImageAsync(productDto.file);
                if (imageResult.Error != null) return BadRequest(new ProblemDetails { Title = imageResult.Error.Message });
                product.imgUrl = imageResult.SecureUrl.ToString();
                product.publicId = imageResult.PublicId;
            }
            
            _context.Products.Add(product);
            var result = await _context.SaveChangesAsync() > 0;

            if (result) return CreatedAtRoute("GetProduct", new { id = product.id}, product);
            return BadRequest(new ProblemDetails { Title = "Problem creating new product" });
        }

        [Authorize(Roles = "Admin")]
        [HttpPut]
        public async Task<ActionResult<Product>> UpdateProduct([FromForm]UpdateProductDTO updateProductDTO)
        {
            var product = await _context.Products.FindAsync(updateProductDTO.id);
            if (product == null) return NotFound();
            _mapper.Map(updateProductDTO, product);

            if(updateProductDTO.file != null)
            {

                var imageResult = await _imageService.AddImageAsync(updateProductDTO.file);

                if (imageResult.Error != null) 
                    return BadRequest(new ProblemDetails { Title = imageResult.Error.Message });
                if (!string.IsNullOrEmpty(product.publicId)) 
                    await _imageService.DeleteImageASync(product.publicId);
                product.imgUrl = imageResult.SecureUrl.ToString();
                product.publicId = imageResult.PublicId;

            }

            var result = await _context.SaveChangesAsync() > 0;
            if (result) return Ok(product);
            return BadRequest(new ProblemDetails { Title = "Problem updating product" });
        }
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return NotFound();

            if (!string.IsNullOrEmpty(product.publicId))
                await _imageService.DeleteImageASync(product.publicId);
            _context.Products.Remove(product);
            var result = await _context.SaveChangesAsync() > 0;
            if (result) return Ok();
            return BadRequest(new ProblemDetails { Title = "Problem deleting product" });

        }


    }



}