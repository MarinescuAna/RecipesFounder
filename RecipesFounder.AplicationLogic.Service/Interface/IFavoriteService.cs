using RecipesFounder.DataAccessLayer.Domain.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace RecipesFounder.AplicationLogic.Service.Interface
{
    public interface IFavoriteService
    {
        Task<Favorite> IsFavoriteAsync(string recipeId, bool isExternal, string email);
        Task<bool> InsertAsync(Favorite favorite);
        Task<bool> DeleteFavoriteAsync(string favorite);
        Task<List<Favorite>> GetFavoriteRecipiesAsync(string email);
    }
}
