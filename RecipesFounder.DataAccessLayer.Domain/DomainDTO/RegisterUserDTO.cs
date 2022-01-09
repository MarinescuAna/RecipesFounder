using System;
using System.Collections.Generic;
using System.Text;

namespace RecipesFounder.DataAccessLayer.Domain.DomainDTO
{
    public class RegisterUserDTO
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string Fullname { get; set; }
    }
}
