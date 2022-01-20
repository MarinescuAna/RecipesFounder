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
    public class RecipeServiceImpl : BaseService, IRecipeService
    {
        public RecipeServiceImpl(IUnitOfWork unitOfwork) : base(unitOfwork)
        {
        }

        public async Task<bool> CreateRecipeAsync(Recipe recipe)
        {
            _unitOfWork.RecipeRepo.InsertItem(recipe);

            return await _unitOfWork.Commit() > 0;
        }
        public async Task<bool> UpdateByIdAsync(Recipe recipe)
        {
            await _unitOfWork.RecipeRepo.UpdateItem(recipe);

            return await _unitOfWork.Commit() > 0;
        }
        public async Task<List<Recipe>> GetAllRecipesByIsPublicFlagAsync() =>
            (await _unitOfWork.RecipeRepo.GetItems()).Where(u => u.IsPublic).ToList();
        public async Task<List<Recipe>> GetAllRecipesByUserEmailAsync(string email) =>
            (await _unitOfWork.RecipeRepo.GetItems()).Where(u => u.UserID == email).ToList();

        public async Task<string[]> GetIngredientsNameByRecipeIdAsync(string id) =>
             (await _unitOfWork.RecipeRepo.GetItem(u => u.RecipeID == id)).Ingredients.Select(u=>u.Name).ToArray();

        public async Task<Recipe> GetRecipeByIdAsync(string id) =>
            await _unitOfWork.RecipeRepo.GetItem(u => u.RecipeID == id);
    }
}
