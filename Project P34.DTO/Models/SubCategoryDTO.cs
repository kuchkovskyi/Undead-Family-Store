using Project_P34.DataAccess.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Project_P34.DTO.Models
{
   public class SubCategoryDTO
    {
        public string Id { get; set; }

       
        public string Name { get; set; }

        public string CategoryId { get; set; }

        public List<Product> products { get; set; }
    }
}
