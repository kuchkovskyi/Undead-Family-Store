using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Project_P34.DataAccess.Entity
{
    public class User : IdentityUser
    {
        public virtual UserMoreInfo UserMoreInfo { get; set; }

        //id viewedProduct      1user - 1 viewedProduct +
        public virtual ViewedProducts ViewedProducts { get; set; }

        public virtual Cart Carts { get; set; }

        public string PictureUrl { get; set; }
    }
}