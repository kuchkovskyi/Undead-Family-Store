using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project_IDA.DTO.Models.Result;
using Project_P34.DataAccess;
using Project_P34.DataAccess.Entity;
using Project_P34.DTO.Models;
using Microsoft.EntityFrameworkCore;

namespace Project_P34.API_Angular.Controllers
{
    [Route("api/ViewedProducts")]
    [ApiController]
    public class ViewedProductsController : ControllerBase
    {
        private readonly EFContext _context;

        public ViewedProductsController(EFContext context)
        {
            _context = context;
        }



        [HttpGet("getViewedProducts/{id}")]/*ID FROM TOKEN*/
        public ViewedProductsDTO getViewedProducts([FromRoute] string id)
        {

            
            ViewedProductsDTO temp = new ViewedProductsDTO();

            var viewItem = _context.viewedProducts.Include(t=>t.Products).FirstOrDefault(t=>t.Id==id);


                temp.Id = viewItem.Id;
                temp.UserId = viewItem.UserId;

                temp.products = viewItem.Products;
 
            return temp;
        
        }


        [HttpPost("addViewedProduct")]
        public ResultDto addViewedProduct([FromBody] ViewedProductsDTO model)
        {
            ViewedProducts viewproducts = new ViewedProducts();

            var product =  _context.products.FirstOrDefault(t => t.Id == model.SearchProductId);
            var prod = _context.products.Include(t => t.ViewedProducts).FirstOrDefault(t => t.Id == model.SearchProductId);
            var view = _context.viewedProducts.FirstOrDefault(t => t.Id == model.UserId);

            if (view == null)
            {
                viewproducts.Id = model.UserId; /*Guid.NewGuid().ToString();*/

                var user = _context.Users.FirstOrDefault(t => t.Id == model.UserId);
                viewproducts.UserId = model.UserId;

                _context.viewedProducts.FirstOrDefault(t => t.Id == model.UserId).Products.Add(prod);

                _context.viewedProducts.Add(viewproducts);
            }
            else
            {

                _context.viewedProducts.FirstOrDefault(t => t.Id == model.UserId).Products.Add(prod);
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