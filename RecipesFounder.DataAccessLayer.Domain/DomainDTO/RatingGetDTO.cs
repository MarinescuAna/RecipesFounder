using System;
using System.Collections.Generic;
using System.Text;

namespace RecipesFounder.DataAccessLayer.Domain.DomainDTO
{
    public class RatingGetDTO
    {
        public int Hearts { get; set; }
        public int Likes { get; set; }
        public int Dislikes { get; set; }
    }
}
