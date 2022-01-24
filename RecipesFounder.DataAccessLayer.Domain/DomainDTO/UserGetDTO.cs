using System;
using System.Collections.Generic;
using System.Text;

namespace RecipesFounder.DataAccessLayer.Domain.DomainDTO
{
    public class UserGetDTO
    {
        public string Email { get; set; }
        public string Name { get; set; }
        public int CreatedRecipies { get; set; }

    }
}
