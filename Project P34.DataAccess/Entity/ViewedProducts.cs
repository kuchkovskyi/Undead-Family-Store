using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Project_P34.DataAccess.Entity
{
    [Table("tblViewedProducts")]
    public class ViewedProducts
    {
        [Key]
        public string Id { get; set; }



        public string UserId { get; set; }

        //Id userMoreinfo 1-1
        public virtual User User { get; set; }

        //id porduct 1-8+
        public virtual List<Product> Products { get; set; } = new List<Product>();
    }
}
