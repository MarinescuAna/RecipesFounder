
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace RecipesFounder.DataAccessLayer.Domain.Domain
{
    public class RecipeInfo
    {
        [ForeignKey("Recipe")]
        public int RecipeID { get; set; }
        public Recipe Recipe { get; set; }
        public int ExternalRecipe { get; set; }
    }
}
