using RecipesFounder.DataAccessLayer.Domain.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace RecipesFounder.AplicationLogic.Service.Interface
{
    public interface IRatingService
    {
        Task<Rating> GetRatingAsync(string recipeId, bool isExtern);
        Task<bool> UpdateRatingAsync(Rating rating);
        Task<bool> InsertRatingAsync(Rating rating);
    }
}
