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
    public class RatingRepoImpl : BaseRepoImpl<Rating>, IRatingRepo
    {
        public RatingRepoImpl(RecipeFounderDbContext recipeFounderDb_dbContext, ILoggerService loggerService) : base(recipeFounderDb_dbContext, loggerService)
        {
        }
        public override async Task<IEnumerable<Rating>> GetItems() =>
            await _dbContext.Ratings
                .Include(s => s.Recipe)
                .ToListAsync();
        public override async Task<Rating> GetItem(Expression<Func<Rating, bool>> expression) =>
           await _dbContext.Ratings
           .Include(s => s.Recipe)
           .AsNoTracking()
           .FirstOrDefaultAsync(expression);
    }
}
