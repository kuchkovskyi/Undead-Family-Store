using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Project_P34.DataAccess.Entity
{
    [Table("tblImages")]
    public class Images
    {
        [Key]
        public string Id { get; set; }
        [Required]
        public string Image { get; set; }

        //Id product 8-1 +
        public string ProductId { get; set; }
        public virtual Product Products { get; set; }
    }
}
