using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Project_P34.DataAccess.Entity
{
    [Table("tblCart")]
   public class Cart
    {
        [Key]
        public string Id { get; set; }
        //Id product 1-8
        //id userMoreinfo 1-1
        public virtual User User { get; set; }
        public float TotalPrice { get; set; } = 0;
        public virtual List<Product> Products { get; set; } = new List<Product>();
    }
}
