namespace ECommerce.DTOs
{
    public class CartItemDTO
    {
        public int productId { get; set; }
        public string name { get; set; }
        public double price { get; set; }
        public string imgUrl { get; set; }
        public double sale { get; set; }
        public int categoryId { get; set; }
        public int quantity { get; set; }
    }
}