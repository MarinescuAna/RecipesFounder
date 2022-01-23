using System;
using System.Collections.Generic;
using System.Text;

namespace RecipesFounder.DataAccessLayer.Domain.DomainDTO
{
    public class RatingAddDTO
    {
        public string RecipeId; 
        public string UserId; 
        public bool IsExternal;
        public string Value;
    }
}
