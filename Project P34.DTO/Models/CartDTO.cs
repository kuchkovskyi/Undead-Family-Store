using Project_P34.DataAccess.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Project_P34.DTO.Models
{
    public class CartDTO
    {
        public string Id { get; set; }
    
        public string SearchProductId { get; set; }

        public float TotalPrice { get; set; }

        public string UserId { get; set; }

        public List<Product> products { get; set; }
    }
}
