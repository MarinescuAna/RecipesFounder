using RecipesFounder.AplicationLogic.Repository.UnitOfWork;
using RecipesFounder.AplicationLogic.Service.Interface;
using RecipesFounder.DataAccessLayer.Domain.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RecipesFounder.AplicationLogic.Service.Implementation
{
    public class FavoriteServiceImpl : BaseService, IFavoriteService
    {
        public FavoriteServiceImpl(IUnitOfWork unitOfwork) : base(unitOfwork)
        {
        }

        public async Task<bool> InsertAsync(Favorite favorite)
        {
            _unitOfWork.FavoriteRepo.InsertItem(favorite);

            return await _unitOfWork.Commit() > 0;
        }
        public async Task<bool> DeleteFavoriteAsync(string favorite)
        {
            await _unitOfWork.FavoriteRepo.DeleteItem(u=>u.FavoriteID==int.Parse(favorite));

            return await _unitOfWork.Commit() > 0;
        }
        public async Task<Favorite> IsFavoriteAsync(string recipeId, bool isExternal, string email) =>
            await _unitOfWork.FavoriteRepo.GetItem(u=>((isExternal && u.ExternalRecipe==recipeId) || (!isExternal && u.RecipeID == recipeId)) && u.UserID==email);
        public async Task<List<Favorite>> GetFavoriteRecipiesAsync(string email) =>
            (await _unitOfWork.FavoriteRepo.GetItems()).Where(u => u.UserID == email).ToList();
    }
}
