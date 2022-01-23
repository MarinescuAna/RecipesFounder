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
    public class RatingServiceImpl : BaseService, IRatingService
    {
        public RatingServiceImpl(IUnitOfWork unitOfwork) : base(unitOfwork)
        {
        }
        public async Task<bool> UpdateRatingAsync(Rating rating)
        {
            await _unitOfWork.RatingRepo.UpdateItem(rating);

            return await _unitOfWork.Commit() > 0;
        }
        public async Task<bool> InsertRatingAsync(Rating rating)
        {
            _unitOfWork.RatingRepo.InsertItem(rating);

            return await _unitOfWork.Commit() > 0;
        }
        public async Task<Rating> WasEvaluatedAsync(string recipeId, string userId, bool isExtern) =>
            await _unitOfWork.RatingRepo.GetItem(u => ((isExtern && u.ExternalRecipe == recipeId) || (!isExtern && u.RecipeID == recipeId)) && u.UserID == userId);
        public async Task<(int likes, int hearts, int dislikes)> GetRatingAsync(string recipeId, bool isExtern)
        {
            (int likes, int hearts, int dislikes) rating = (0,0,0);

            rating.likes= (await _unitOfWork.RatingRepo.GetItems()).Where(u =>( (isExtern && u.ExternalRecipe == recipeId) || (!isExtern && u.RecipeID == recipeId)) && u.Likes).Count();
            rating.hearts= (await _unitOfWork.RatingRepo.GetItems()).Where(u =>( (isExtern && u.ExternalRecipe == recipeId) || (!isExtern && u.RecipeID == recipeId)) && u.Hearts).Count();
            rating.dislikes= (await _unitOfWork.RatingRepo.GetItems()).Where(u =>( (isExtern && u.ExternalRecipe == recipeId) || (!isExtern && u.RecipeID == recipeId)) && u.Dislikes).Count();

            return rating;
        }
            
    }
}
