using ApplicationLoggerLibrary;
using Microsoft.EntityFrameworkCore;
using RecipesFounder.AplicationLogic.Repository.Interface;
using RecipesFounder.DataAccessLayer.Domain.Domain;
using RecipesFounder.DataAccessLayer.Repository;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace RecipesFounder.AplicationLogic.Repository.Implementation
{
    public class RecipeRepoImpl : BaseRepoImpl<Recipe>, IRecipeRepo
    {
        public RecipeRepoImpl(RecipeFounderDbContext recipeFounderDb_dbContext, ILoggerService loggerService) : base(recipeFounderDb_dbContext, loggerService)
        {
        }
        public override async Task<IEnumerable<Recipe>> GetItems() =>
            await _dbContext.Recipes
                .Include(s => s.User)
                .Include(s => s.Ratings)
                .Include(s => s.Ingredients)
                .Include(s => s.Comments)
                .ToListAsync();
        public override async Task<Recipe> GetItem(Expression<Func<Recipe, bool>> expression) =>
           await _dbContext.Recipes
                .Include(s => s.User)
                .Include(s => s.Ratings)
                .Include(s => s.Ingredients)
                .Include(s => s.Comments)
               .AsNoTracking()
               .FirstOrDefaultAsync(expression);
    }
}
