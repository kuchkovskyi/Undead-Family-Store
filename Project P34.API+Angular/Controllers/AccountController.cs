using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using System.Net;
using System.Net.Http.Headers;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Project_IDA.DTO.Models;
using Project_IDA.DTO.Models.Result;
using Project_P34.API_Angular.Helper;
using Project_P34.DataAccess;
using Project_P34.DataAccess.Entity;
using Project_P34.Domain.Interfaces;
using Project_P34.DTO.Models;
using WebCrudApi.Helpers;

namespace Project_IDA.Api___Angular.Controllers
{
    [EnableCors("MyAllowSpecificOrigins")]
    [Route("api/Account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly EFContext _context;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _configuration;
        private readonly IJWTTokenService _jwtTokenService;

        public AccountController(
            EFContext context,
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            IConfiguration configuration,
            IJWTTokenService jWtTokenService)
        {
            _userManager = userManager;
            _context = context;
            _configuration = configuration;
            _signInManager = signInManager;
            _jwtTokenService = jWtTokenService;
        }

        [HttpPost("register")]
        public async Task<ResultDto> Register([FromBody] UserRegisterDto model)
        {
            if (!ModelState.IsValid)
            {
                return new ResultErrorDto
                {
                    Status = 500,
                    Message = "Error, register",
                    Errors = CustomValidator.GetErrorsByModel(ModelState)
                };
            }



            var user = new User()
            {
                UserName = model.Email,
                Email = model.Email,
                PhoneNumber = model.PhoneNumber
            };

            var userMoreInfo = new UserMoreInfo()
            {
                FullName = model.FullName,
                Age = model.Age,
                Id = user.Id
            };


            var result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                return new ResultErrorDto
                {
                    Status = 500,
                    Errors = CustomValidator.GetErrorsByIdentityResult(result)
                };
            }
            else
            {
                result = _userManager.AddToRoleAsync(user, "User").Result;
                _context.userMoreInfos.AddAsync(userMoreInfo);
                _context.SaveChanges();
            }

            return new ResultDto
            {
                Status = 200,
                Message = "OK"
            };
        }



        [HttpPost("login")]
        public async Task<ResultDto> Login([FromBody] UserLoginDto model)
        {
            if (!ModelState.IsValid)
            {
                return new ResultErrorDto
                {
                    Status = 400,
                    Message = "ERROR",
                    Errors = CustomValidator.GetErrorsByModel(ModelState)
                };
            }
            else
            {
                var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, false, false);
                if (!result.Succeeded)
                {
                    List<string> error = new List<string>();
                    error.Add("User is not found, password or email isn't correct!");
                    return new ResultErrorDto
                    {
                        Status = 400,
                        Message = "User not found!",
                        Errors = error
                    };
                }
                else
                {
                    var user = await _userManager.FindByEmailAsync(model.Email);
                    await _signInManager.SignInAsync(user, false);

                    return new ResultLoginDto
                    {
                        Status = 200,
                        Message = "OK",
                        Token = _jwtTokenService.CreateToken(user)
                    };

                }
            }
        }


        [HttpGet("google-login")]
        public IActionResult GoogleLogin()
        {
            var properties = new AuthenticationProperties { RedirectUri = Url.Action("GoogleResponse") };
            return Challenge(properties, GoogleDefaults.AuthenticationScheme);

        }

        [HttpGet("google-response")]
        public async Task<IActionResult> GoogleResponse()
        {
            var result = await HttpContext.AuthenticateAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            var claims = result.Principal.Identities.FirstOrDefault()
                .Claims.Select(claim => new
                {
                    claim.Issuer,
                    claim.OriginalIssuer,
                    claim.Type,
                    claim.Value
                });

            return (IActionResult)claims;
        }


        [HttpPost("recoverPassword")]
        public async Task <ResultDto> recoverPassword([FromBody] RecoverPasswordDTO model)
        {



            var user = await _userManager.FindByEmailAsync(model.Email);
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var newPass = CreatePassword(10);
            var result = await _userManager.ResetPasswordAsync(user, token, newPass);

         
            MailAddress from = new MailAddress("undeadfamilyshop@gmail.com", "Recover Password");
            MailAddress to = new MailAddress(model.Email.ToString());
            MailMessage m = new MailMessage(from, to);
            m.Subject = "Recover Password | Undead Family";
            m.Body = "<img src='https://upload.wikimedia.org/wikipedia/commons/b/bf/White_dog_lying_on_the_floor.jpg'>" + "<br>" + "<h2>" + newPass + "</h2>";
            m.IsBodyHtml = true;
            SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587);
            smtp.Credentials = new NetworkCredential("undeadfamilyshop@gmail.com", "Qwerty-1");
            smtp.EnableSsl = true;
            smtp.Send(m);
            await _context.SaveChangesAsync();

            return new ResultDto
            {
                Status = 200,
                Message = "OK"
            };
        }


        public string CreatePassword(int length)
        {
            const string valid = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
            StringBuilder res = new StringBuilder();
            Random rnd = new Random();
            while (0 < length--)
            {
                res.Append(valid[rnd.Next(valid.Length)]);
            }
            return res.ToString();
        }

        [HttpPost("upload/image/{id}"), DisableRequestSizeLimit]
        public async Task<ResultDto> Upload(string id)
        {
            try
            {
                var user = await _context.userMoreInfos.SingleOrDefaultAsync(t => t.Id == id);
                var file = Request.Form.Files[0];
                var folderName = Path.Combine("wwwroot", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');

                    var ext = Path.GetExtension(fileName);
                    var newFileName = Guid.NewGuid().ToString() + ext;
                    if (user.Image != null)
                    {
                        var pathToDelete = Path.Combine(pathToSave, user.Image);
                        if (System.IO.File.Exists(pathToDelete))
                        {
                            System.IO.File.Delete(pathToDelete);
                        }
                    }

                    user.Image = newFileName;
                    var fullPath = Path.Combine(pathToSave, newFileName);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }

                    await _context.SaveChangesAsync();

                    return new ResultDto
                    {
                        Status = 200,
                        Message = "Posted"
                    };
                }
                else
                {
                    return new ResultDto
                    {
                        Status = 500,
                        Message = "Not found"
                    };
                }
            }
            catch (Exception ex)
            {
                return new ResultDto
                {
                    Status = 500,
                    Message = ex.Message
                };
            }
        }



    }
}