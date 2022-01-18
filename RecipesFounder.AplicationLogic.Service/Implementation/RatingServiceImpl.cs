using RecipesFounder.AplicationLogic.Repository.UnitOfWork;
using RecipesFounder.AplicationLogic.Service.Interface;
using RecipesFounder.DataAccessLayer.Domain.Domain;
using System;
using System.Collections.Generic;
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
        public async Task<Rating> GetRatingAsync(string recipeId, bool isExtern) =>
            await _unitOfWork.RatingRepo.GetItem(u => (isExtern && u.ExternalRecipe == recipeId) || (!isExtern && u.RecipeID == recipeId));
    }
}
