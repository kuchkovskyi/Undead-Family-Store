using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Project_P34.DataAccess.Entity
{
    [Table("tblProduct")]
    public class Product
    {
        [Key]
        public string Id { get; set; }
        [Required]
        public string Name { get; set; }
        
        [Required]
        public string Image { get; set; }
        [Required]
        public float Price { get; set; }
        [Required]
        public string Size { get; set; }
        [Required]
        public string CountryMade { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public double Rating { get; set; }

       [Required]
        public int Count { get; set; }


        //id images 1-8  +
        public virtual ICollection<Images> Images { get; set; }
        //id subcategory 8-1 +
        public string SubcategoryId { get; set; }
        public virtual Subcategory Subcategories { get; set; }
        //id comment 1-8 +
        public ICollection<Commentaries> Commentariess { get; set; }
        //id wishlist 8-1 +
        public string WishListId { get; set; }
        public virtual WishList WishLists { get; set; }
        //id cart 8-1 +
        public string CartId { get; set; }
        public virtual Cart Carts { get; set; }
        //id viewedProduct 8-1 +
        public string viewProductId { get; set; }
        public virtual ViewedProducts ViewedProducts { get; set; }




    }
}
