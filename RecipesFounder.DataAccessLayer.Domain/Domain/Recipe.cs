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
        public int RecipeID { get; set; }
        [ForeignKey("User")]
        public string UserID { get; set; }
        public string Description { get; set; }
        public DateTime CreationDate { get; set; }
        public string ImageContent { get; set; }
        public string ImageName { get; set; }
        public string PreparationDescription { get; set; }

        public ICollection<Rating> Ratings { get; set; }
        public ICollection<Ingredient> Ingredients { get; set; }
        public ICollection<Comment> Comments { get; set; }
        public User User { get; set; }
    }
}
