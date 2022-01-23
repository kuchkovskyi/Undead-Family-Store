using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Project_P34.DataAccess.Entity
{
    [Table("tblCategory")]
    public class Category
    {
        [Key]
        public string Id { get; set; }

        [Required]
        public string Name { get; set; }
       
        public ICollection<Subcategory> Subcategories { get; set; }

        //Id subcategory 8-1 +

    }
}
