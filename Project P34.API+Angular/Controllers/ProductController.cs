using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project_IDA.DTO.Models.Result;
using Project_P34.DataAccess;
using Project_P34.DataAccess.Entity;
using Project_P34.DTO.Models;
using Project_P34.DTO.Models.Result;

namespace Project_P34.API_Angular.Controllers
{
    [Route("api/Product")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly EFContext _context;
        private readonly IMapper _mapper;

        public ProductController(EFContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        //*
        //[HttpGet("getProducts")]
        //public async Task<IEnumerable<ProductDTO>> getProductsss()
        //{
        //    var dataFromDB = await _context.products.ToListAsync();

        //    return data;
        //}

        //*

        [HttpGet("getProducts")]
        public IEnumerable<ProductDTO> getProducts()
        {
            List<ProductDTO> data = new List<ProductDTO>();

            var dataFromDB = _context.products.ToList();

            foreach (var item in dataFromDB)
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
                temp.SubcategoryId = item.SubcategoryId;

                data.Add(temp);
            }
            return data;
        }



        [HttpGet("{id}")]
        public IEnumerable<ProductDTO> getProductyId([FromRoute] string id)
        {
            List<ProductDTO> data = new List<ProductDTO>();


            var product = _context.products./*Include(t => t.Images).*/FirstOrDefault(t => t.Id == id);

            var images = _context.images.Where(t => t.ProductId == id);


            ProductDTO temp = new ProductDTO();

            temp.Id = product.Id;
            temp.Name = product.Name;
            temp.Image = product.Image;
            temp.Price = product.Price;
            temp.Size = product.Size;
            temp.CountryMade = product.CountryMade;
            temp.Description = product.Description;
            temp.Rating = product.Rating;
            temp.Count = product.Count;
            //foreach (var item in images)
            //{
            //    temp.Images.Add(item.Image);
            //}


            data.Add(temp);

            return data;
        }

        [Authorize(Roles ="Admin")]
        [HttpPost("addImageToProduct/{id}")]
        public ResultDto addImageToProduct([FromBody] ImagesDTO model, [FromRoute] string id)
        {
            var product = _context.products.FirstOrDefault(t => t.Id == id);

            Images temp = new Images();

            temp.Id = model.Id;
            temp.Image = model.Image;

            product.Images.Add(temp);
            _context.SaveChanges();

            return new ResultDto
            {
                Status = 200,
                Message = "OK"
            };

        }

        [HttpPost("addProduct")]
        public ResultDto addProduct([FromBody] ProductDTO model)
        {
            Product products = new Product();
            Images images = new Images();

            products.Id = Guid.NewGuid().ToString();

            products.Name = model.Name;
            products.Image = model.Image;
            products.Price = model.Price;
            products.Size = model.Size;
            products.CountryMade = model.CountryMade;
            products.Description = model.Description;
            products.Rating = model.Rating;
            products.Count = model.Count;
            products.SubcategoryId = model.SubcategoryId;
            _context.products.Add(products);
            _context.SaveChanges();
            foreach (var item in model.Images)
            {
                images.Id = Guid.NewGuid().ToString();
                images.Image = item;
                images.ProductId = products.Id;
                _context.images.Add(images);
                //products.Images.Add(new Images { 
                //Id= Guid.NewGuid().ToString(),
                //Image = item,
                //ProductId = products.Id,
                //});
            }

            _context.SaveChanges();

            return new ResultDto
            {
                Status = 200,
                Message = "OK"
            };

        }


        [HttpPost("editProduct/{id}")]
        public ResultDto editProduct([FromRoute] string id, [FromBody] ProductDTO model)
        {
            var products = _context.products.FirstOrDefault(t => t.Id == id);

            products.Name = model.Name;
            products.Image = model.Image;
            products.Price = model.Price;
            products.Size = model.Size;
            products.CountryMade = model.CountryMade;
            products.Description = model.Description;
            products.Rating = model.Rating;
            products.Count = model.Count;


            _context.SaveChanges();

            return new ResultDto
            {
                Status = 200,
                Message = "OK"
            };

        }


        [HttpPost("removeProduct/{id}")]
        public ResultDto removeProduct([FromRoute] string id)
        {
            //try
            //{
            var images = _context.images.Where(t => t.ProductId == id);

            foreach (var itemImage in images)
            {
                _context.images.Remove(itemImage);
            }
            _context.SaveChanges();

            var product = _context.products.FirstOrDefault(t => t.Id == id);
            if (product != null)
            {
                _context.products.Remove(product);
            }
            _context.SaveChanges();




            return new ResultDto
            {
                Status = 200,
                Message = "Ok"
            };

         
        }



        [HttpGet("searchProduct")] //localhost:12312?searchString=text
        public List<ProductDTO> searchByProduct([FromQuery] string searchString)
        {
            if (searchString == null)
            {

                List<ProductDTO> data = new List<ProductDTO>();

                var dataFromDB = _context.products.ToList();

                foreach (var item in dataFromDB)
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
                    temp.SubcategoryId = item.SubcategoryId;

                    data.Add(temp);
                }
                return data;
            }
            else
            { 
            var products = _context.products
                .Where(t => t.Name.Contains(searchString)).Select(q => new ProductDTO
                {
                    Id = q.Id,
                    Name = q.Name,
                    Price = q.Price,
                    Image = q.Image,
                    Size = q.Size,
                    CountryMade = q.CountryMade,
                    Description = q.Description,
                    Rating = q.Rating,
                    Count = q.Count,
                    SubcategoryId = q.SubcategoryId
                }).ToList();
            return products;
            }
        }

        [HttpPost("addToWishList")]
        public async Task<ResultDto> addToWishList([FromBody] WishListDTO model)
        {
            try
            {
                var wishlist = _mapper.Map<WishListDTO, WishList>(model);
                await _context.wishLists.AddAsync(wishlist);
                await _context.SaveChangesAsync();
                return new ResultDto
                {
                    Status = 200,
                    Message = "OK"
                };
            }
            catch (Exception ex)
            {
                List<string> temp = new List<string>();
                temp.Add(ex.Message);
                return new ResultErrorDto
                {
                    Status = 500,
                    Message = "Error",
                    Errors = temp
                };
            }
        }



    }
}
