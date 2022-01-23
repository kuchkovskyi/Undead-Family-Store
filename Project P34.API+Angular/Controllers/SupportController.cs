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

namespace Project_P34.API_Angular.Controllers
{
    [AllowAnonymous]
    [Route("api/Support")]
    [ApiController]
    public class SupportController : ControllerBase
    {
        private readonly EFContext _context;
        private readonly IMapper _mapper;

        public SupportController(EFContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }


        [HttpPost("AddRequest")]
        public async Task<ResultDto> AddRequest([FromBody] SupportDTO model)
        {
            try
            {
                var request = _mapper.Map<SupportDTO, SupportRequest>(model);
                await _context.requests.AddAsync(request);
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

        [HttpGet("{id}")]
        public async Task<SupportDTO> getRequestById([FromRoute] int id)
        {
            var requests = await _context.requests.SingleOrDefaultAsync(t => t.Id == id);
            return _mapper.Map<SupportRequest, SupportDTO>(requests);
        }


        [HttpGet]
        public async Task<IEnumerable<SupportDTO>> GetRequests()
        {
            var requests = await _context.requests.ToListAsync();
            return _mapper.Map<List<SupportRequest>, List<SupportDTO>>(requests);
        }

        [HttpPost("{id}")]
        public async Task<ResultDto> RemoveRequest([FromRoute] int id)
        {
            var requests = await _context.requests.SingleOrDefaultAsync(t => t.Id == id);
            _context.requests.Remove(requests);
            await _context.SaveChangesAsync();
            return new ResultDto
            {
                Status = 200,
                Message = "OK"
            };
        }




    }
}
