using System;
using System.Collections.Generic;
using System.Text;

namespace RecipesFounder.DataAccessLayer.Domain.DomainDTO
{
    public class RecipeGetCardDTO
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Image { get; set; }
        public bool IsPublic { get; set; }
    }
}
