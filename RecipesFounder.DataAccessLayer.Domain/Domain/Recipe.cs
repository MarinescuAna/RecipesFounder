using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace RecipesFounder.DataAccessLayer.Domain.Domain
{
    public class Recipe
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string RecipeID { get; set; }
        [ForeignKey("User")]
        public string UserID { get; set; }
        public string Summary { get; set; }
        public string Title { get; set; }
        public DateTime CreationDate { get; set; }
        public int Servings { get; set; }
        public int ReadyInMinutes { get; set; }
        public int HealtyScore { get; set; }
        public bool GlutenFree { get; set; }
        public bool Ketogenic { get; set; }
        public bool Vegetarian { get; set; }
        public bool Vegan { get; set; }
        public bool IsPublic { get; set; }
        public string Image { get; set; }
        public string ImageSteps { get; set; }
        public string PreparationDescription { get; set; }

        public ICollection<Rating> Ratings { get; set; }
        public ICollection<Ingredient> Ingredients { get; set; }
        public ICollection<Comment> Comments { get; set; }
        public User User { get; set; }
    }
}
