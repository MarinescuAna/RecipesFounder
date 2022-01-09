using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RecipesFounder.AplicationLogic.Service.UnitOfWork;
using RecipesFounder.DataAccessLayer.Domain.Domain;
using RecipesFounder.DataAccessLayer.Domain.DomainDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecipiesFounder.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : BaseController
    {
        public CommentController(IUnitOfWorkForServices unitOfWorkForServices, IHttpContextAccessor httpContextAccessor)
            : base(unitOfWorkForServices, httpContextAccessor)
        {
        }
        [HttpPost]
        [Route("/api/Comment/InsertComment")]
        [Authorize]
        public async Task<IActionResult> InsertComment(CommentInsertDTO commentInsertDTO)
        {
            if (commentInsertDTO == null)
            {
                return StatusCode(ErrorsAndMessages.Number_204, ErrorsAndMessages.NoContent);
            }

            if (await _unitOfWorkForServices.CommentService.InsertCommentAsync(new Comment { 
                AddedDateTime=DateTime.Now,
                Content=commentInsertDTO.Content,
                ExternalRecipe=commentInsertDTO.IsExternal?commentInsertDTO.RecipeID:0,
                RecipeID=!commentInsertDTO.IsExternal?commentInsertDTO.RecipeID:0,
                UserID=ExtractEmailFromJWT()
            }))
            {
                return Ok();
            }

            return StatusCode(ErrorsAndMessages.Number_400, ErrorsAndMessages.SomethingWentWrong);
        }
        [HttpGet]
        [Route("/api/Comment/GetComments")]
        [AllowAnonymous]
        public async Task<IActionResult> GetComments(string recipeDetails)
        {
            if (string.IsNullOrEmpty(recipeDetails))
            {
                return StatusCode(ErrorsAndMessages.Number_204, ErrorsAndMessages.NoContent);
            }

            var split = recipeDetails.Split("#");
            var list = await _unitOfWorkForServices.CommentService.GetComments(int.Parse(split[0]), bool.Parse(split[1]));
            if (list == null)
            {
                return StatusCode(ErrorsAndMessages.Number_400, ErrorsAndMessages.SomethingWentWrong);
            }

            var newList = new List<CommentGetDTO>();
            list.ForEach(recipe => {
                newList.Add(
                    new CommentGetDTO
                    {
                        Content = recipe.Content,
                        DatetimeAdded = recipe.AddedDateTime.ToString(),
                        UserName = recipe.User.Name
                    });
            });

            return Ok(newList);
        }
    }
}
