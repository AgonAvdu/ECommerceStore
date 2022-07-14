using ECommerce.Model.OrderAggregate;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerce.DTOs
{
    public class CreateOrderDTO
    {
        public Boolean SaveAddress { get; set; }
        public ShippingAddress ShippingAddress { get; set; }

    }
}
