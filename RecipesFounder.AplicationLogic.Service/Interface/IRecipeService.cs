using RecipesFounder.DataAccessLayer.Domain.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace RecipesFounder.AplicationLogic.Service.Interface
{
    public interface IRecipeService
    {
        Task<bool> CreateRecipeAsync(Recipe recipe);
        Task<List<Recipe>> GetAllRecipesByUserEmailAsync(string email);
        Task<List<Recipe>> GetAllRecipesByIsPublicFlagAsync();
    }
}
