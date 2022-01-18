using System;
using System.Collections.Generic;
using System.Text;

namespace RecipesFounder.DataAccessLayer.Domain.DomainDTO
{
    public class CommentInsertDTO
    {
        public string Content { get; set; }
        public string RecipeID { get; set; }
        public bool IsExternal { get; set; }
    }
}
