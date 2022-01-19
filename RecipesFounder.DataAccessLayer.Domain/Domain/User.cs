using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace RecipesFounder.DataAccessLayer.Domain.Domain
{
    public class User
    {        
        [MaxLength(254)]
        [Key]
        public string Email { get; set; }
        [MaxLength(128)]
        public string Name { get; set; }

        [MaxLength(128)]
        public string Password { get; set; }
        public string AccessToken { get; set; }
        public DateTime AccessTokenExpDate { get; set; }
        public ICollection<Favorite> Favorites { get; set; }
    }
}
