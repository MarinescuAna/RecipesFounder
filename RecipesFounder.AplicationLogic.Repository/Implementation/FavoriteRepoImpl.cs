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
    public class FavoriteRepoImpl : BaseRepoImpl<Favorite>, IFavoriteRepo
    {
        public FavoriteRepoImpl(RecipeFounderDbContext recipeFounderDb_dbContext, ILoggerService loggerService) : base(recipeFounderDb_dbContext, loggerService)
        {
        }
        public override async Task<IEnumerable<Favorite>> GetItems() =>
            await _dbContext.Favorites
                .Include(s => s.User)
                .Include(s => s.Recipe)
                .ToListAsync();
        public override async Task<Favorite> GetItem(Expression<Func<Favorite, bool>> expression) =>
               await _dbContext.Favorites
                .Include(s => s.User)
                .Include(s => s.Recipe)
               .AsNoTracking()
               .FirstOrDefaultAsync(expression);
    }
}
