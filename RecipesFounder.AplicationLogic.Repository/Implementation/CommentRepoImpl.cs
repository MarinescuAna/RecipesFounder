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
    public class CommentRepoImpl : BaseRepoImpl<Comment>, ICommentRepo
    {
        public CommentRepoImpl(RecipeFounderDbContext recipeFounderDb_dbContext, ILoggerService loggerService) : base(recipeFounderDb_dbContext, loggerService)
        {
        }
        public override async Task<IEnumerable<Comment>> GetItems() =>
            await _dbContext.Comments
                .Include(s => s.User)
                .Include(s => s.Recipe)
                .ToListAsync();
        public override async Task<Comment> GetItem(Expression<Func<Comment, bool>> expression) =>
            await _dbContext.Comments
                .Include(s => s.User)
                .Include(s => s.Recipe)
                .AsNoTracking()
                .FirstOrDefaultAsync(expression);
    }
}
