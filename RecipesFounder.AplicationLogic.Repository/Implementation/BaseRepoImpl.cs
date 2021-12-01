using ApplicationLoggerLibrary;
using Microsoft.EntityFrameworkCore;
using RecipesFounder.AplicationLogic.Repository.Interface;
using RecipesFounder.DataAccessLayer.Repository;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace RecipesFounder.AplicationLogic.Repository.Implementation
{
    public class BaseRepoImpl<T>: IBaseRepo<T> where T : class
    {
        protected RecipeFounderDbContext _dbContext;
        private readonly ILoggerService _applicationLogger;
        public BaseRepoImpl(RecipeFounderDbContext recipeFounderDb_dbContext,ILoggerService loggerService)
        {
            _applicationLogger = loggerService;
            _dbContext = recipeFounderDb_dbContext;
        }
        public async Task<bool> DeleteItem(Expression<Func<T, bool>> expression)
        {
            _applicationLogger.LogInfo("Try to retrieve form database the record which meets the condition.");
            T itemFind = await GetItem(expression);

            if (itemFind == null)
            {
                _applicationLogger.LogInfo("No data was found");
                return false;
            }
            try
            {
                _applicationLogger.LogInfo("The record was found and now it try to remove the item");
                _dbContext.Set<T>().Remove(itemFind);

                return true;
            }
            catch (Exception ex)
            {
                _applicationLogger.LogError($"The item can't be remove from some reasons. The follow error appear: {ex.Message}");

                if (ex.InnerException != null)
                {
                    _applicationLogger.LogError($"Inner Exception Message: {ex.InnerException.Message}");
                }
            }

            return false;
        }

        public virtual async Task<T> GetItem(Expression<Func<T, bool>> expression)
        {
            try
            {
                _applicationLogger.LogInfo("Try to retrieve form database the record which meets the condition.");
                return await _dbContext.Set<T>().AsNoTracking().FirstOrDefaultAsync(expression);
            }
            catch (Exception ex)
            {
                _applicationLogger.LogError($"The item can't be retreived from some reasons. The follow error appear: {ex.Message}");

                if (ex.InnerException != null)
                {
                    _applicationLogger.LogError($"Inner Exception Message: {ex.InnerException.Message}");
                }
            }

            return null;
        }

        public virtual async Task<IEnumerable<T>> GetItems()
        {
            try
            {
                _applicationLogger.LogInfo("Try to retrieve form database all records.");
                return await _dbContext.Set<T>().AsNoTracking().ToListAsync();
            }
            catch (Exception ex)
            {
                _applicationLogger.LogError($"The items can't be retrieved from some reasons. The follow error appear: {ex.Message}");

                if (ex.InnerException != null)
                {
                    _applicationLogger.LogError($"Inner Exception Message: {ex.InnerException.Message}");
                }
                return null;
            }
        }

        public async void InsertItem(T item)
        {
            try
            {
                _applicationLogger.LogInfo("Try to insert the record into database.");
                await _dbContext.Set<T>().AddAsync(item);
            }
            catch (Exception ex)
            {
                _applicationLogger.LogError($"The item can't be inserted from some reasons. The follow error appear: {ex.Message}");

                if (ex.InnerException != null)
                {
                    _applicationLogger.LogError($"Inner Exception Message: {ex.InnerException.Message}");
                }
            }
        }

        public Task<bool> UpdateItem(T item)
        {
            try
            {
                _applicationLogger.LogInfo("Try to update the record into database.");
                _dbContext.Set<T>().Update(item);

                return Task.FromResult(true);
            }
            catch (Exception ex)
            {
                _applicationLogger.LogError($"The item can't be updated from some reasons. The follow error appear: {ex.Message}");

                if (ex.InnerException != null)
                {
                    _applicationLogger.LogError($"Inner Exception Message: {ex.InnerException.Message}");
                }
            }
            return Task.FromResult(false);
        }
    }
}
