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

namespace ECommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public UserController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select * from Users";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EcommerceConn");
            SqlDataReader myReader;
            using (SqlConnection myConn = new SqlConnection(sqlDataSource))
            {
                myConn.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myConn))
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
            string query = @"select * from Users where id = @UserId  ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EcommerceConn");
            SqlDataReader myReader;
            using (SqlConnection myConn = new SqlConnection(sqlDataSource))
            {
                myConn.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myConn))
                {
                    myCommand.Parameters.AddWithValue("@UserId", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myConn.Close();
                }
            }
            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(User user)
        {
            string query = @"
                           insert into Users
                           values (@UserName, @UserSurname, @UserEmail, 
                            @UserPassword, 1)
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EcommerceConn");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@UserName", user.name);
                    myCommand.Parameters.AddWithValue("@UserSurname", user.surname);
                    myCommand.Parameters.AddWithValue("@UserEmail", user.email);
                    myCommand.Parameters.AddWithValue("@UserPassword", user.password);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }

        [HttpPut]
        public JsonResult Put(User user)
        {
            string query = @"update Users 
                             set name = @UserName, surname = @UserSurname, 
                             email = @UserEmail, password = @UserPassword
                              where id = @UserId";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EcommerceConn");
            SqlDataReader myReader;
            using (SqlConnection myConn = new SqlConnection(sqlDataSource))
            {
                myConn.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myConn))
                {
                    myCommand.Parameters.AddWithValue("@UserId", user.id);
                    myCommand.Parameters.AddWithValue("@UserName", user.name);
                    myCommand.Parameters.AddWithValue("@UserSurname", user.surname);
                    myCommand.Parameters.AddWithValue("@UserEmail", user.email);
                    myCommand.Parameters.AddWithValue("@UserPassword", user.password);

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
            string query = @"delete Users 
                             where id = @UserId";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EcommerceConn");
            SqlDataReader myReader;
            using (SqlConnection myConn = new SqlConnection(sqlDataSource))
            {
                myConn.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myConn))
                {
                    myCommand.Parameters.AddWithValue("@UserId", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myConn.Close();
                }
            }
            return new JsonResult("Deleted Successfully");
        }

    }
}
