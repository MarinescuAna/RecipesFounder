using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RecipesFounder.AplicationLogic.Service.UnitOfWork;
using RecipesFounder.DataAccessLayer.Domain.Domain;
using RecipesFounder.DataAccessLayer.Domain.DomainDTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RecipiesFounder.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //TODO [Authorize]
    public class FavoriteController : BaseController
    {
        public FavoriteController(IUnitOfWorkForServices unitOfWorkForServices) : base(unitOfWorkForServices)
        {
        }

        [HttpPost]
        [Route("/api/Favorite/AddToFavorite")]
        public async Task<IActionResult> AddToFavorite(FavoriteInsertDTO favoriteInsertDTO)
        {
            if (favoriteInsertDTO == null)
            {
                return StatusCode(ErrorsAndMessages.Number_204, ErrorsAndMessages.NoContent);
            }

            if (!await _unitOfWorkForServices.FavoriteService.InsertAsync(
                new Favorite
                {
                    UserID=favoriteInsertDTO.Email,
                    ExternalRecipe=favoriteInsertDTO.isExternal?favoriteInsertDTO.RecipeId:null,
                    RecipeID=!favoriteInsertDTO.isExternal?favoriteInsertDTO.RecipeId:null,
                }
                ))
            {
                return StatusCode(ErrorsAndMessages.Number_400, ErrorsAndMessages.SomethingWentWrong);
            }

            return Ok();
        }
        [HttpDelete]
        [Route("/api/Favorite/DeleteFavorite")]
        public async Task<IActionResult> DeleteFavorite(string favoriteId)
        {
            if (string.IsNullOrEmpty(favoriteId))
            {
                return StatusCode(ErrorsAndMessages.Number_204, ErrorsAndMessages.NoContent);
            }

            if (!await _unitOfWorkForServices.FavoriteService.DeleteFavoriteAsync(favoriteId))
            {
                return StatusCode(ErrorsAndMessages.Number_400, ErrorsAndMessages.SomethingWentWrong);
            }

            return Ok();
        }
        [HttpGet]
        [Route("/api/Favorite/IsFavorite")]
        public async Task<IActionResult> IsFavorite(string favDetails)
        {
            if (string.IsNullOrEmpty(favDetails))
            {
                return StatusCode(ErrorsAndMessages.Number_204, ErrorsAndMessages.NoContent);
            }

            var split = favDetails.Split("@@");
            var fav = await _unitOfWorkForServices.FavoriteService.IsFavoriteAsync(split[0], bool.Parse(split[1]), split[2]);

            return Ok(fav == null);
        }
        [HttpGet]
        [Route("/api/Favorite/GetFavoriteRecipies")]
        public async Task<IActionResult> GetFavoriteRecipies(string email)
        {

            if (string.IsNullOrEmpty(email))
            {
                return StatusCode(ErrorsAndMessages.Number_400, ErrorsAndMessages.SomethingWentWrong);
            }

            var recipes = new List<FavoriteGetDTO>();

            (await _unitOfWorkForServices.FavoriteService.GetFavoriteRecipiesAsync(email)).ForEach(recipe => {
                recipes.Add(new FavoriteGetDTO
                {
                    Id=recipe.FavoriteID,
                    Image=recipe.Recipe?.Image,
                    RecipeId=recipe.RecipeID,
                    Title=recipe.Recipe?.Title,
                    ExternalRecipe=recipe.ExternalRecipe
                });
            });

            return Ok(recipes);
        }
    }
}
