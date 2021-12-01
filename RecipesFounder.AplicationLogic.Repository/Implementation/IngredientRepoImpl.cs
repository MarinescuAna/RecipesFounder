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
    public class IngredientRepoImpl : BaseRepoImpl<Ingredient>, IIngredientRepo
    {
        public IngredientRepoImpl(RecipeFounderDbContext recipeFounderDb_dbContext, ILoggerService loggerService) : base(recipeFounderDb_dbContext, loggerService)
        {
        }
        public override async Task<IEnumerable<Ingredient>> GetItems() =>
            await _dbContext.Ingredients
                .Include(s => s.Recipe)

                .ToListAsync();
        public override async Task<Ingredient> GetItem(Expression<Func<Ingredient, bool>> expression) =>
           await _dbContext.Ingredients
           .Include(s => s.Recipe)
           .AsNoTracking()
           .FirstOrDefaultAsync(expression);
    }
}
