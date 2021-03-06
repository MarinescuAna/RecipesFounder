using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace RecipesFounder.DataAccessLayer.Domain.Domain
{
    public class Ingredient
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int IngredientID { get; set; }
        public string Name { get; set; }
        [ForeignKey("Recipe")]
        public string RecipeID { get; set; }
        public Recipe Recipe { get; set; }
    }
}
