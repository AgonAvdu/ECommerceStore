using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using ECommerce.Model;
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace ECommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public ProductController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select * from Products";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EcommerceConn");
            SqlDataReader myReader;
            using (SqlConnection myConn = new SqlConnection(sqlDataSource))
            {
                myConn.Open();
                using(SqlCommand myCommand = new SqlCommand(query, myConn))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myConn.Close();
                }
            }
            return new JsonResult(table);
        }
        [HttpGet("{id}")]
        public JsonResult GetbyId(int id)
        {
            string query = @"select * from Products where id = @ProductId  ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EcommerceConn");
            SqlDataReader myReader;
            using (SqlConnection myConn = new SqlConnection(sqlDataSource))
            {
                myConn.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myConn))
                {
                    myCommand.Parameters.AddWithValue("@ProductId", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myConn.Close();
                }
            }
            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(Product product)
        {
            string query = @"
                           insert into Products
                           values (@ProductName, @ProductDescription, @ProductImg, 
                            @ProductUserId, @ProductRating, @ProductPrice, 
                            @ProductSale, @ProductCategory, @ProductCreated,
                            @ProductEdited)
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EcommerceConn");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@ProductName", product.name);
                    myCommand.Parameters.AddWithValue("@ProductDescription", product.description);
                    myCommand.Parameters.AddWithValue("@ProductImg", product.imgUrl);
                    myCommand.Parameters.AddWithValue("@ProductUserId", product.userId);
                    myCommand.Parameters.AddWithValue("@ProductRating", product.rating);
                    myCommand.Parameters.AddWithValue("@ProductPrice", product.price);
                    myCommand.Parameters.AddWithValue("@ProductSale", product.sale);
                    myCommand.Parameters.AddWithValue("@ProductCategory", product.categoryId);
                    myCommand.Parameters.AddWithValue("@ProductCreated", DateTime.Now);
                    myCommand.Parameters.AddWithValue("@ProductEdited", DateTime.Now);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }

        [HttpPut]
        public JsonResult Put(Product product)
        {
            string query = @"update Products 
                             set name = @ProductName 
                              where id = @ProductId";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EcommerceConn");
            SqlDataReader myReader;
            using (SqlConnection myConn = new SqlConnection(sqlDataSource))
            {
                myConn.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myConn))
                {
                    myCommand.Parameters.AddWithValue("@ProductId", product.id);
                    myCommand.Parameters.AddWithValue("@ProductName", product.name);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myConn.Close();
                }
            }
            return new JsonResult("Updated Successfully");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"delete Products 
                             where id = @ProductId";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EcommerceConn");
            SqlDataReader myReader;
            using (SqlConnection myConn = new SqlConnection(sqlDataSource))
            {
                myConn.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myConn))
                {
                    myCommand.Parameters.AddWithValue("@ProductId", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myConn.Close();
                }
            }
            return new JsonResult("Deleted Successfully");
        }

        [Route("SaveFile")]
        [HttpPost]

        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/Photos/" + filename;
                using(var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }
                return new JsonResult(filename);

            } catch(Exception)
            {
                return new JsonResult("annonymous.png");
            }
        }
    }
}
