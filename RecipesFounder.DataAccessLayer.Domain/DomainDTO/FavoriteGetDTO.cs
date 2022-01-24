using System;
using System.Collections.Generic;
using System.Text;

namespace RecipesFounder.DataAccessLayer.Domain.DomainDTO
{
    public class FavoriteGetDTO
    {
        public string RecipeId { get; set; }
        public string Title { get; set; }
        public string Image { get; set; }
        public int Id { get; set; }
        public string ExternalRecipe { get; set; }
    }
}
