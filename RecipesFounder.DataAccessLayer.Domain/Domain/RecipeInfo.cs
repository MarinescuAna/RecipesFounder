
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace RecipesFounder.DataAccessLayer.Domain.Domain
{
    public class RecipeInfo
    {
        [ForeignKey("Recipe")]
        public string? RecipeID { get; set; }
        public Recipe? Recipe { get; set; }
        public string? ExternalRecipe { get; set; }
    }
}
