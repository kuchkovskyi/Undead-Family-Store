using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project_P34.DataAccess;

namespace Project_P34.API_Angular.Controllers
{
    [Route("api/Filter")]
    [ApiController]
    public class FilterController : ControllerBase
    {
        private readonly EFContext _context;
        public FilterController(EFContext context)
        {
            _context = context;
        }

    }
}
