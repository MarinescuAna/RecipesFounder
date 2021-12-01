using Microsoft.EntityFrameworkCore;
using RecipesFounder.DataAccessLayer.Domain.Domain;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace RecipesFounder.DataAccessLayer.Repository
{
    public class RecipeFounderDbContext : DbContext
    {
        public RecipeFounderDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<User>  Users{ get; set; }
        public DbSet<Recipe>Recipes{ get; set; }
        public DbSet<Favorite> Favorites{ get; set; }
        public DbSet<Rating> Ratings{ get; set; }
        public DbSet<Comment> Comments{ get; set; }
        public DbSet<Ingredient>Ingredients{ get; set; }
    }
}
