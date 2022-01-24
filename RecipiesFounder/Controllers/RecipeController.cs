
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RecipesFounder.AplicationLogic.Service.UnitOfWork;
using RecipesFounder.DataAccessLayer.Domain.Domain;
using RecipesFounder.DataAccessLayer.Domain.DomainDTO;
using System.Threading.Tasks;
using System.Linq;
using System;
using System.Collections.Generic;

namespace RecipiesFounder.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipeController : BaseController
    {
        public RecipeController(IUnitOfWorkForServices unitOfWorkForServices) : base(unitOfWorkForServices)
        {
        }
        //TODO [Authorize]
        [HttpPut]
        [Route("/api/Recipe/MakePublic")]
        public async Task<IActionResult> MakePublic(RecipeUpdatePublicDTO recipeUpdatePublicDTO)
        {
            if(recipeUpdatePublicDTO==null)
            {
                return StatusCode(ErrorsAndMessages.Number_204, ErrorsAndMessages.NoContent);
            }

            var recipe = await _unitOfWorkForServices.RecipeService.GetRecipeByIdAsync(recipeUpdatePublicDTO.Id);
            if (recipe == null)
            {
               //TODO no content
                return StatusCode(ErrorsAndMessages.Number_400, ErrorsAndMessages.SomethingWentWrong);
            }

            recipe.IsPublic= !recipe.IsPublic;
            if (!await _unitOfWorkForServices.RecipeService.UpdateByIdAsync(recipe))
            {
                return StatusCode(ErrorsAndMessages.Number_400, ErrorsAndMessages.SomethingWentWrong);
            }
            return Ok();
        }
        //TODO [Authorize]
        [HttpPost]
        [Route("/api/Recipe/CreateRecipe")]
        public async Task<IActionResult> CreateRecipe(RecipeCreateDTO recipeCreateDTO)
        {
            if (recipeCreateDTO == null)
            {
                return StatusCode(ErrorsAndMessages.Number_204, ErrorsAndMessages.NoContent);
            }

            var guid = Guid.NewGuid().ToString();
            var newRecipe = new Recipe
            {
                RecipeID = guid,
                GlutenFree = recipeCreateDTO.GlutenFree,
                CreationDate = System.DateTime.Now,
                HealtyScore = recipeCreateDTO.HealtyScore,
                Image = recipeCreateDTO.Image,
                ImageSteps = recipeCreateDTO.ImageSteps,
                IsPublic = false,
                Ketogenic = recipeCreateDTO.Ketogenic,
                PreparationDescription = recipeCreateDTO.PreparationDescription,
                ReadyInMinutes = recipeCreateDTO.ReadyInMinutes,
                Title = recipeCreateDTO.Title,
                Servings = recipeCreateDTO.Servings,
                Summary = recipeCreateDTO.Summary,
                Vegan = recipeCreateDTO.Vegan,
                Vegetarian = recipeCreateDTO.Vegetarian,
                //TODO UserID = ExtractEmailFromJWT(),
                UserID = recipeCreateDTO.Email,
                Ingredients = recipeCreateDTO.ExtendedIngredients.Select(u => new Ingredient
                {
                    Name = u,
                    RecipeID = guid
                }).ToList()
            };

            if (!await _unitOfWorkForServices.RecipeService.CreateRecipeAsync(newRecipe))
            {
                return StatusCode(ErrorsAndMessages.Number_400, ErrorsAndMessages.SomethingWentWrong);
            }
            return Ok();
        }
        [HttpGet]
        [Route("/api/Recipe/GetPublicRecipie")]
        [AllowAnonymous]
        public async Task<IActionResult> GetPublicRecipie(string id)
        {

            if (string.IsNullOrEmpty(id))
            {
                return StatusCode(ErrorsAndMessages.Number_400, ErrorsAndMessages.SomethingWentWrong);
            }

            var recipe = await _unitOfWorkForServices.RecipeService.GetRecipeByIdAsync(id);

            if (recipe==null)
            {
                return StatusCode(ErrorsAndMessages.Number_400, ErrorsAndMessages.SomethingWentWrong);
            }
            return Ok(new RecipeGetDTO {
                Email = recipe.UserID,
                Username = (await _unitOfWorkForServices.UserService.GetUserByEmailAsync(recipe.UserID)).Name,
                ExtendedIngredients = recipe.Ingredients?.Select(u => u.Name).ToArray(),
                GlutenFree = recipe.GlutenFree,
                HealtyScore = recipe.HealtyScore,
                Image = recipe.Image,
                ImageSteps = recipe.ImageSteps,
                Ketogenic = recipe.Ketogenic,
                PreparationDescription = recipe.PreparationDescription,
                ReadyInMinutes = recipe.ReadyInMinutes,
                Servings = recipe.Servings,
                Summary = recipe.Summary,
                Title = recipe.Title,
                Vegan = recipe.Vegan,
                IsPublic=recipe.IsPublic,
                Vegetarian = recipe.Vegetarian,
                Id = recipe.RecipeID

            });
        }

        [HttpGet]
        [Route("/api/Recipe/GetPublicRecipies")]
        [AllowAnonymous]
        public async Task<IActionResult> GetPublicRecipies()
        {

            var list = await _unitOfWorkForServices.RecipeService.GetAllRecipesByIsPublicFlagAsync();
            if (list == null)
            {
                return StatusCode(ErrorsAndMessages.Number_400, ErrorsAndMessages.SomethingWentWrong);
            }

            var newList = new List<RecipeGetCardDTO>();
            list.ForEach(recipe => {
                newList.Add(
                    new RecipeGetCardDTO
                    {
                        Image=recipe.Image,
                        IsPublic = recipe.IsPublic,
                        Title =recipe.Title,
                        Id = recipe.RecipeID
                    });

            });

            return Ok(newList);
        }

        [HttpGet]
        [Route("/api/Recipe/GetUserRecipies")]
        //TODO [Authorize]
        //TODO remove the email parameter 
        public async Task<IActionResult> GetUserRecipies(string email)
        {
            if(string.IsNullOrEmpty(email))
            {
                return StatusCode(ErrorsAndMessages.Number_204, ErrorsAndMessages.NoContent);
            }

            var list = await _unitOfWorkForServices.RecipeService.GetAllRecipesByUserEmailAsync(email);
            if (list == null)
            {
                return StatusCode(ErrorsAndMessages.Number_400, ErrorsAndMessages.SomethingWentWrong);
            }

            var newList = new List<RecipeGetDTO>();
            list.ForEach(async recipe => {
                newList.Add(
                    new RecipeGetDTO
                    {
                        Email = recipe.UserID,
                        Username = (await _unitOfWorkForServices.UserService.GetUserByEmailAsync(recipe.UserID)).Name,
                        ExtendedIngredients = recipe.Ingredients?.Select(u => u.Name).ToArray(),
                        GlutenFree = recipe.GlutenFree,
                        HealtyScore = recipe.HealtyScore,
                        Image = recipe.Image,
                        ImageSteps = recipe.ImageSteps,
                        Ketogenic = recipe.Ketogenic,
                        PreparationDescription = recipe.PreparationDescription,
                        ReadyInMinutes = recipe.ReadyInMinutes,
                        Servings = recipe.Servings,
                        Summary = recipe.Summary,
                        Title = recipe.Title,
                        Vegan = recipe.Vegan,
                        IsPublic = recipe.IsPublic,
                        Vegetarian = recipe.Vegetarian,
                        Id = recipe.RecipeID
                    });

            });

            return Ok(newList);
        }
        [HttpGet]
        [Route("/api/Recipe/GetUserPublicRecipies")]
        [AllowAnonymous]
        //TODO remove the email parameter 
        public async Task<IActionResult> GetUserPublicRecipies(string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                return StatusCode(ErrorsAndMessages.Number_204, ErrorsAndMessages.NoContent);
            }

            var list = (await _unitOfWorkForServices.RecipeService.GetAllRecipesByUserEmailAsync(email))?.Where(u=>u.IsPublic).ToList();
            if (list == null)
            {
                return StatusCode(ErrorsAndMessages.Number_400, ErrorsAndMessages.SomethingWentWrong);
            }

            var newList = new List<RecipeGetDTO>();
            list.ForEach(async recipe => {
                newList.Add(
                    new RecipeGetDTO
                    {
                        Email = recipe.UserID,
                        Username = (await _unitOfWorkForServices.UserService.GetUserByEmailAsync(recipe.UserID)).Name,
                        ExtendedIngredients = recipe.Ingredients?.Select(u => u.Name).ToArray(),
                        GlutenFree = recipe.GlutenFree,
                        HealtyScore = recipe.HealtyScore,
                        Image = recipe.Image,
                        ImageSteps = recipe.ImageSteps,
                        Ketogenic = recipe.Ketogenic,
                        PreparationDescription = recipe.PreparationDescription,
                        ReadyInMinutes = recipe.ReadyInMinutes,
                        Servings = recipe.Servings,
                        Summary = recipe.Summary,
                        Title = recipe.Title,
                        Vegan = recipe.Vegan,
                        IsPublic = recipe.IsPublic,
                        Vegetarian = recipe.Vegetarian,
                        Id = recipe.RecipeID
                    });

            });

            return Ok(newList);
        }
    }
}
