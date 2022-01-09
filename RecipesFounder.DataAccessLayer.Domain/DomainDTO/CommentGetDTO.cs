using System;
using System.Collections.Generic;
using System.Text;

namespace RecipesFounder.DataAccessLayer.Domain.DomainDTO
{
    public class CommentGetDTO
    {
        public string Content { get; set; }
        public string DatetimeAdded { get; set; }
        public string UserName { get; set; }
    }
}
