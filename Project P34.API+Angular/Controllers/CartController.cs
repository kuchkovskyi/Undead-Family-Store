using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project_IDA.DTO.Models.Result;
using Project_P34.DataAccess;
using Project_P34.DataAccess.Entity;
using Project_P34.DTO.Models;

namespace Project_P34.API_Angular.Controllers
{
    [Route("api/Cart")]
    [ApiController]
    public class CartController : ControllerBase
    {

        private readonly EFContext _context;

        public CartController(EFContext context)
        {
            _context = context;
        }



        [HttpGet("getCartProducts/{id}")]/*ID FROM TOKEN*/
        public CartDTO getCartProducts([FromRoute] string id)
        {


            CartDTO temp = new CartDTO();

            var viewItem = _context.carts.Include(t => t.Products).FirstOrDefault(t => t.Id == id);

            temp.Id = viewItem.Id;
            temp.products = viewItem.Products;
            temp.TotalPrice = viewItem.TotalPrice;

            return temp;

        }

        [HttpPost("removeProductCart/{idUser}/{idProduct}")]
        public ResultDto removeProductCart([FromRoute] string idUser, [FromRoute] string idProduct)
        {


            var product = _context.products.FirstOrDefault(t => t.Id == idProduct);
            var cart = _context.carts.FirstOrDefault(t => t.Id == idUser);

            if (product != null)
            {

                cart.TotalPrice -= product.Price;
                cart.Products.Remove(product);
            }
            _context.SaveChanges();




            return new ResultDto
            {
                Status = 200,
                Message = "Ok"
            };
        }

        [Authorize(Roles = "Admin, User")]
        [HttpPost("addCartProducts")]
        public ResultDto addCartProducts([FromBody] CartDTO model)
        {
            Cart cartproducts = new Cart();

            var product = _context.products.FirstOrDefault(t => t.Id == model.SearchProductId);
            var prod = _context.products.Include(t => t.Carts).FirstOrDefault(t => t.Id == model.SearchProductId);
            var cart = _context.carts.FirstOrDefault(t => t.Id == model.UserId);

            if (cart == null)
            {
                cartproducts.Id = model.UserId;
                cartproducts.TotalPrice += prod.Price;
                cartproducts.Products.Add(prod);

                //var user = _context.Users.FirstOrDefault(t => t.Id == model.UserId);

                _context.carts.Add(cartproducts);

            }
            else
            {
              
                cart.TotalPrice += product.Price;
                _context.carts.FirstOrDefault(t => t.Id == model.UserId).Products.Add(prod);
                //view.Products.Add(prod);
            }

            _context.SaveChanges();

            return new ResultDto
            {
                Status = 200,
                Message = "OK"
            };

        }

    }

}
