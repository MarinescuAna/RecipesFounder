using System;
using System.Collections.Generic;
using System.Text;

namespace RecipesFounder.DataAccessLayer.Domain.DomainDTO
{
    public class FavoriteInsertDTO
    {
        public bool isExternal { get; set; }
        public string RecipeId { get; set; }
        public string Email { get; set; }
    }
}
