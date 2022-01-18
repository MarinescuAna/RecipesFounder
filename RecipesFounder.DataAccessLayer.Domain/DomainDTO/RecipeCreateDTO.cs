using System;
using System.Collections.Generic;
using System.Text;

namespace RecipesFounder.DataAccessLayer.Domain.DomainDTO
{
    public class RecipeCreateDTO
    {
        public string Title { get; set; }
        public string Image { get; set; }
        public string Email { get; set; }
        public int Servings { get; set; }
        public int ReadyInMinutes { get; set; }
        public int HealtyScore { get; set; }
        public bool GlutenFree { get; set; }
        public bool Ketogenic { get; set; }
        public bool Vegetarian { get; set; }
        public bool Vegan { get; set; }
        public string Summary { get; set; }
        public string ImageSteps { get; set; }
        public string PreparationDescription { get; set; }
        public string[] ExtendedIngredients { get; set; }
    }
}
