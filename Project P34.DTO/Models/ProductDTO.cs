using System;
using System.Collections.Generic;
using System.Text;

namespace Project_P34.DTO.Models
{
   public class ProductDTO
    {
        public string Id { get; set; }
       
        public string Name { get; set; }

       
        public string Image { get; set; }
       
        public float Price { get; set; }
      
        public string Size { get; set; }
       
        public string CountryMade { get; set; }
     
        public string Description { get; set; }
       
        public double Rating { get; set; }

      
        public int Count { get; set; }

        public string SubcategoryId { get; set; }
        public List<string> Images { get; set; }
    }
}
