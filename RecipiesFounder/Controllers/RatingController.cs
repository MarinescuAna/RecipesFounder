using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RecipesFounder.AplicationLogic.Service.UnitOfWork;
using RecipesFounder.DataAccessLayer.Domain.Domain;
using RecipesFounder.DataAccessLayer.Domain.DomainDTO;
using System.Threading.Tasks;

namespace RecipiesFounder.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RatingController : BaseController
    {
        public RatingController(IUnitOfWorkForServices unitOfWorkForServices) : base(unitOfWorkForServices)
        {
        }
        [HttpPost]
        [Route("/api/Rating/EvaluateRecipe")]
        [AllowAnonymous]
        public async Task<IActionResult> EvaluateRecipe(RatingAddDTO ratingDetails)
        {
            if (ratingDetails==null)
            {
                return StatusCode(ErrorsAndMessages.Number_204, ErrorsAndMessages.NoContent);
            }
            
            var rating = new Rating
            {
                UserID = ratingDetails.UserId,
                Dislikes = false,
                Hearts = false,
                Likes = false,
            };

            if (ratingDetails.IsExternal)
            {
                rating.ExternalRecipe = ratingDetails.RecipeId;
            }
            else
            {
                rating.RecipeID = ratingDetails.RecipeId;
            }

            switch (ratingDetails.Value)
            {
                case "L":
                    rating.Likes= true;
                    break;
                case "H":
                    rating.Hearts= true;
                    break;
                case "D":
                    rating.Dislikes= true;
                    break;
            }
            if(!await _unitOfWorkForServices.RatingService.InsertRatingAsync(rating))
            {
                return StatusCode(ErrorsAndMessages.Number_400, ErrorsAndMessages.SomethingWentWrong);
            }
            
            return Ok();
        }

        [HttpGet]
        [Route("/api/Rating/GetRating")]
        [AllowAnonymous]
        public async Task<IActionResult> GetRating(string ratingDetails)
        {
            if (string.IsNullOrEmpty(ratingDetails))
            {
                return StatusCode(ErrorsAndMessages.Number_204, ErrorsAndMessages.NoContent);
            }

            var split = ratingDetails.Split("@");
            var rating = await _unitOfWorkForServices.RatingService.GetRatingAsync(split[0], bool.Parse(split[1]));

            return Ok(new RatingGetDTO
            {
                Hearts = rating.hearts,
                Likes = rating.likes,
                Dislikes = rating.dislikes,
            });
        }
        [HttpGet]
        [Route("/api/Rating/WasEvaluated")]
        [AllowAnonymous]
        public async Task<IActionResult> WasEvaluated(string ratingDetails)
        {
            if (string.IsNullOrEmpty(ratingDetails))
            {
                return StatusCode(ErrorsAndMessages.Number_204, ErrorsAndMessages.NoContent);
            }

            var split = ratingDetails.Split("@@");
            var rating = await _unitOfWorkForServices.RatingService.WasEvaluatedAsync(split[0], split[1], bool.Parse(split[2]));

            return Ok(rating == null);
        }
    }
}
