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
    public class UserRepoImpl : BaseRepoImpl<User>, IUserRepo
    {
        public UserRepoImpl(RecipeFounderDbContext recipeFounderDb_dbContext, ILoggerService loggerService) : base(recipeFounderDb_dbContext, loggerService)
        {
        }
        public override async Task<IEnumerable<User>> GetItems() =>
            await _dbContext.Users
                .Include(s => s.Favorites)
                .Include(s => s.Recipes)
                .ToListAsync();
        public override async Task<User> GetItem(Expression<Func<User, bool>> expression) =>
           await _dbContext.Users
                .Include(s => s.Favorites)
                .Include(s => s.Recipes)
               .AsNoTracking()
               .FirstOrDefaultAsync(expression);
    }
}
