using AutoMapper;
using Project_P34.DataAccess.Entity;
using Project_P34.DTO.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project_P34.API_Angular.Mapper
{
    public class MapperProfiles: Profile
    {
        public MapperProfiles()
        {
            CreateMap<SupportRequest, SupportDTO>().ReverseMap();
            CreateMap<WishList, WishListDTO>().ReverseMap();
        }
    }
}
