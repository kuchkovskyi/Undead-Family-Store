using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Project_P34.DataAccess.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Project_P34.DataAccess
{
    public class EFContext : IdentityDbContext<User>
    {
        public EFContext(DbContextOptions<EFContext> options) : base(options) { }

        public DbSet<Cart> carts { get; set; }
        public DbSet<Category> categories { get; set; }
        public DbSet<Commentaries> commentaries { get; set; }
        public DbSet<Images> images { get; set; }
        public DbSet<Product> products { get; set; }
        public DbSet<Subcategory> subCategories { get; set; }
        public DbSet<UserMoreInfo> userMoreInfos { get; set; }
        public DbSet<ViewedProducts> viewedProducts { get; set; }
        public DbSet<WishList> wishLists { get; set; }
        public DbSet<SupportRequest> requests { get; set; }




        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<User>()
                .HasOne(u => u.UserMoreInfo)
                .WithOne(t => t.User)
                .HasForeignKey<UserMoreInfo>(ui => ui.Id);

            builder.Entity<Commentaries>().HasOne(pt => pt.UserMoreInfo)
                .WithMany(p => p.Commentariess)
                .HasForeignKey(pt => pt.UserId);

            builder.Entity<Images>().HasOne(pt => pt.Products)
                 .WithMany(p => p.Images)
                 .HasForeignKey(pt => pt.ProductId);

            builder.Entity<Subcategory>().HasOne(pt => pt.Categories)
                  .WithMany(p => p.Subcategories)
                  .HasForeignKey(pt => pt.CategoryId)
                  .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Product>().HasOne(pt => pt.Subcategories)
                  .WithMany(p => p.Products)
                  .HasForeignKey(pt => pt.SubcategoryId);

            builder.Entity<Commentaries>().HasOne(pt => pt.Products)
                  .WithMany(p => p.Commentariess)
                  .HasForeignKey(pt => pt.ProductId);

            builder.Entity<Product>().HasOne(pt => pt.WishLists)
                  .WithMany(p => p.Products)
                  .HasForeignKey(pt => pt.WishListId);

            builder.Entity<Product>().HasOne(pt => pt.Carts)
                  .WithMany(p => p.Products)
                  .HasForeignKey(pt => pt.CartId);

            builder.Entity<Product>().HasOne(pt => pt.ViewedProducts)
                  .WithMany(p => p.Products)
                  .HasForeignKey(pt => pt.viewProductId);


            builder.Entity<User>()
                .HasOne(u => u.Carts)
                .WithOne(t => t.User)
                .HasForeignKey<Cart>(ui => ui.Id);

            builder.Entity<UserMoreInfo>()
                .HasOne(u => u.WishLists)
                .WithOne(t => t.UserMoreInfo)
                .HasForeignKey<WishList>(ui => ui.Id);

            builder.Entity<User>()
                .HasOne(u => u.ViewedProducts)
                .WithOne(t => t.User)
                .HasForeignKey<ViewedProducts>(ui => ui.Id);


            base.OnModelCreating(builder);
        }


    }
}
