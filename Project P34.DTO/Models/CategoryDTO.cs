using Project_P34.DataAccess.Entity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Project_P34.DTO.Models
{
    public class CategoryDTO
    {
        public string Id { get; set; }
        public string Name { get; set; }

        //public List<Subcategory> Subcategories { get; set; }


    }
}
