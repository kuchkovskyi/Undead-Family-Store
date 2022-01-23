using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Project_P34.DataAccess.Entity
{
    [Table("tblWishList")]
    public class WishList
    {
        [Key]
        public string Id { get; set; }
        // id product 1-8 +
        public ICollection<Product> Products{ get; set; }
        // id user 1-1
        public string UserId { get; set; }
        public virtual UserMoreInfo UserMoreInfo { get; set; }
    }
}
