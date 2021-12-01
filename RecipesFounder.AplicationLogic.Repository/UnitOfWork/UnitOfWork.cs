using ApplicationLoggerLibrary;
using RecipesFounder.AplicationLogic.Repository.Implementation;
using RecipesFounder.AplicationLogic.Repository.Interface;
using RecipesFounder.DataAccessLayer.Repository;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace RecipesFounder.AplicationLogic.Repository.UnitOfWork
{
    public class UnitOfWork:IUnitOfWork
    {
        private IUserRepo _user;
        private IRecipeRepo _recipe;
        private IRatingRepo _rating;
        private IIngredientRepo _ingredient;
        private IFavoriteRepo _favorite;
        private ICommentRepo _comment;
        private RecipeFounderDbContext _dbContext;
        private ILoggerService _loggerService;
        public UnitOfWork(RecipeFounderDbContext recipeFounderDbContext,ILoggerService loggerService)
        {
            _dbContext = recipeFounderDbContext;
            _loggerService = loggerService;
        }
        public IFavoriteRepo FavoriteRepo
        {
            get
            {
                if (_favorite == null)
                {
                    _favorite = new FavoriteRepoImpl(_dbContext, _loggerService);
                }

                return _favorite;
            }
        }
        public ICommentRepo CommentRepo
        {
            get
            {
                if (_comment == null)
                {
                    _comment = new CommentRepoImpl(_dbContext, _loggerService);
                }

                return _comment;
            }
        }
        public IIngredientRepo IngredientRepo
        {
            get
            {
                if (_ingredient == null)
                {
                    _ingredient = new IngredientRepoImpl(_dbContext, _loggerService);
                }

                return _ingredient;
            }
        }
        public IRatingRepo RatingRepo
        {
            get
            {
                if (_rating == null)
                {
                    _rating = new RatingRepoImpl(_dbContext, _loggerService);
                }

                return _rating;
            }
        }
        public IRecipeRepo RecipeRepo
        {
            get
            {
                if (_recipe == null)
                {
                    _recipe = new RecipeRepoImpl(_dbContext, _loggerService);
                }

                return _recipe;
            }
        }
        public IUserRepo UserRepo
        {
            get
            {
                if (_user == null)
                {
                    _user = new UserRepoImpl(_dbContext, _loggerService);
                }

                return _user;
            }
        }
        public async Task<int> Commit()
        {
            try
            {
                LoggMessageInfo("Try to commit the changes.");
                return await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {

                LoggMessageError($"The commit faild because the follow error occures: {ex.Message}");

                if (ex.InnerException != null)
                {
                    LoggMessageError($" Inner Exception Message: {ex.InnerException.Message}");
                }

                Dispose();
            }

            return -1;
        }

        public void LoggMessageError(string message)
        {
            _loggerService.LogError(message);
        }
        public void LoggMessageInfo(string message)
        {
            _loggerService.LogInfo(message);
        }
        public async void Dispose()
        {
            LoggMessageInfo("Dispose.");
            await _dbContext.DisposeAsync();
        }
    }
}
