using ECommerce.Model;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerce.DTOs
{
    public class CreateProductDTO
    {
        [Required]
        public string name { get; set; }
        [Required]

        public string description { get; set; }
        [Required]

        public IFormFile file { get; set; }

        [Required]
        [Range(1, Double.PositiveInfinity)]

        public double price { get; set; }
        [Required]
        [Range(0, 100)]
        public int sale { get; set; }
        [Required]
        [Range(1, Double.PositiveInfinity)]
        public int categoryId { get; set; }

        [Required]
        [Range(10, Double.PositiveInfinity)]
        public int quantityInStock { get; set; }

    }
}
