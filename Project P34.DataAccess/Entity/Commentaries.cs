using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Project_P34.DataAccess.Entity
{
    [Table("tblCommentaries")]
   public class Commentaries
    {
        [Key]
        public string Id { get; set; }

        [Required]
        public string Description { get; set; }
        [Required]
        public DateTime DateComment { get; set; }


        //Id userMoreinfo 8-1 +
        public string UserId { get; set; }
        public UserMoreInfo UserMoreInfo { get; set; }

        //id product 8-1 + 
        public string ProductId { get; set; }
        public Product Products { get; set; }

    }
}
