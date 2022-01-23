using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project_IDA.DTO.Models.Result;
using Project_P34.DataAccess;
using Project_P34.DataAccess.Entity;
using Project_P34.DTO.Models;

namespace Project_P34.API_Angular.Controllers
{
    [Route("api/SubCategory")]
    [ApiController]
    public class SubCategoryController : ControllerBase
    {
        private readonly EFContext _context;

        public SubCategoryController(EFContext context)
        {
            _context = context;
        }



        [HttpGet("getSubCategories")]
        public IEnumerable<SubCategoryDTO> getSubCategory()
        {
            List<SubCategoryDTO> data = new List<SubCategoryDTO>();

            var dataFromDB = _context.subCategories.ToList();


            foreach (var item in dataFromDB)
            {
                SubCategoryDTO temp = new SubCategoryDTO();

                temp.Id = item.Id;
                temp.Name = item.Name;

                data.Add(temp);
            }
            return data;
        }


        [HttpGet("subcategoriesFromCategory/{idCategory}")]
        public IEnumerable<SubCategoryDTO> subcategoriesFromCategory([FromRoute] string idCategory)
        {
            List<SubCategoryDTO> data = new List<SubCategoryDTO>();


            var subCategory = _context.subCategories.Where(t => t.CategoryId == idCategory);

            SubCategoryDTO temp = new SubCategoryDTO();
            foreach (var item in subCategory)
            {

                temp.Id = item.Id;
                temp.Name = item.Name;
                temp.CategoryId = item.CategoryId;

                data.Add(temp);
            }
            return data;
        }



        [HttpGet("getSubCategoryProducts/{id}")]
        public IEnumerable<ProductDTO> getSubCategoryProducts([FromRoute] string id)
        {
            List<ProductDTO> data = new List<ProductDTO>();


            var products = _context.products.Where(t => t.SubcategoryId == id);

            foreach (var item in products)
            {
                ProductDTO temp = new ProductDTO();

                temp.Id = item.Id;
                temp.Name = item.Name;
                temp.Image = item.Image;
                temp.Price = item.Price;
                temp.Size = item.Size;
                temp.CountryMade = item.CountryMade;
                temp.Description = item.Description;
                temp.Rating = item.Rating;
                temp.Count = item.Count;

                data.Add(temp);
            }
            return data;
        }


        [HttpPost("addSubCategory")]
        public ResultDto addSubCategory([FromBody] SubCategoryDTO model)
        {
            Subcategory subcategories = new Subcategory();

            subcategories.Id = Guid.NewGuid().ToString();
            subcategories.Name = model.Name;
            subcategories.CategoryId = model.CategoryId;

            //var category = _context.categories.Include(t => t.Subcategories).SingleOrDefault(t => t.Id == model.CategoryId);
            //category.Subcategories.Add(subcategories);
            //subcategories.CategoryId = model.CategoryId;


            _context.subCategories.Add(subcategories);

            _context.SaveChanges();

            return new ResultDto
            {
                Status = 200,
                Message = "OK"
            };

        }


        [HttpPost("editSubCategory/{id}")]
        public ResultDto editSubCategory([FromRoute] string id, [FromBody] CategoryDTO model)
        {
            var subcategories = _context.subCategories.FirstOrDefault(t => t.Id == id);

            subcategories.Name = model.Name;
            subcategories.Id = model.Id;


            _context.SaveChanges();

            return new ResultDto
            {
                Status = 200,
                Message = "OK"
            };

        }


        [HttpPost("removeSubCategory/{id}")]
        public ResultDto removeSubCategory([FromRoute] string id)
        {
            try
            {
                var subcategory = _context.subCategories.FirstOrDefault(t => t.Id == id);
                var products = _context.products.Where(t => t.SubcategoryId == id).ToList();

                if (products.Count != 0)
                {
                    foreach (var item in products)
                    {
                        var images = _context.images.Where(t => t.ProductId == item.Id).ToList();
                        if (images.Count != 0)
                        {
                            foreach (var itemImage in images)
                            {
                                _context.images.Remove(itemImage);
                            }
                        }
                        _context.products.Remove(item);
                    }
                }

                _context.subCategories.Remove(subcategory);

                _context.SaveChanges();

                return new ResultDto
                {
                    Status = 200,
                    Message = "Ok"
                };

            }
            catch (Exception e)
            {
                List<string> temp = new List<string>();
                temp.Add(e.Message);

                return new ResultDto
                {
                    Status = 500,
                    Message = "Error",
                    Errors = temp
                };

            }
        }




    }
}
