using System;
using System.Collections.Generic;
using System.Text;

namespace Project_IDA.DTO.Models.Result
{
    public class ResultDto
    {
        public int Status { get; set; }
        public string Message { get; set; }

        public string Token { get; set; }
        public List<string> Errors { get; set; }
    }
}
