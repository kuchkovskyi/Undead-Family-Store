using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Project_P34.DataAccess.Entity
{
    [Table("tblSubCategory")]
   public class Subcategory
    {
        [Key]
        public string Id { get; set; }

        [Required]
        public string Name { get; set; }



        //Id Product 1-8 +
        public ICollection<Product> Products { get; set; }
        //Id category 8-1  +
        public string CategoryId { get; set; }

        public virtual Category Categories { get; set; }
    }
}
