using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace RecipesFounder.DataAccessLayer.Domain.Domain
{
    public class Rating:RecipeInfo
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int RatingID { get; set; }
        public int Hearts { get; set; }
        public int Likes { get; set; }
        public int Unlikes { get; set; }
    }
}
