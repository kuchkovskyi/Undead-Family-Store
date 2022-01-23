using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Project_P34.DataAccess.Entity
{
    
    public class SupportRequest
    {
        [Key]
        public int Id { get; set; }
        public string Email { get; set; }

        public string Text { get; set; }
    }
}
