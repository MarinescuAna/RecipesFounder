using RecipesFounder.DataAccessLayer.Domain.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace RecipesFounder.AplicationLogic.Service.Interface
{
    public interface IRatingService
    {
        Task<Rating> WasEvaluatedAsync(string recipeId, string userId, bool isExtern);
        Task<(int likes, int hearts, int dislikes)> GetRatingAsync(string recipeId, bool isExtern);
        Task<bool> UpdateRatingAsync(Rating rating);
        Task<bool> InsertRatingAsync(Rating rating);
    }
}
