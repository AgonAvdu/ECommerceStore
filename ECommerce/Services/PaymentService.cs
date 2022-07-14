using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Stripe;
using ECommerce.Model;

namespace ECommerce.Services
{
    public class PaymentService
    {
        public IConfiguration _config { get; }
        public PaymentService(IConfiguration config)
        {
            _config = config;
        }

        public async Task<PaymentIntent> CreateOrUpdatePaymentIntent(Cart cart)
        {
            StripeConfiguration.ApiKey = _config["StripeSettings:SecretKey"];

            var service = new PaymentIntentService();
            var intent = new PaymentIntent();

            var subtotal = cart.items.Sum(item => ((item.Product.price * 100) * (1 - (item.Product.sale / 100)) * item.quantity));
            var deliveryFee = subtotal > 100 ? 0 : 5;

            if(string.IsNullOrEmpty(cart.PaymentIntentId))
            {
                var options = new PaymentIntentCreateOptions
                {
                    Amount = (long)((subtotal + deliveryFee)),
                    Currency = "eur",
                    PaymentMethodTypes = new List<string> { "card" }
                };
                intent = await service.CreateAsync(options);
                

            }
            else
            {
                var options = new PaymentIntentUpdateOptions
                {
                    Amount = (long)(subtotal + deliveryFee)
                };
                await service.UpdateAsync(cart.PaymentIntentId, options);
            }
            return intent;
        }

    }
}
