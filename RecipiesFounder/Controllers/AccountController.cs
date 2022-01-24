using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using RecipesFounder.AplicationLogic.Service.Interface;
using RecipesFounder.AplicationLogic.Service.UnitOfWork;
using RecipesFounder.DataAccessLayer.Domain.Domain;
using RecipesFounder.DataAccessLayer.Domain.DomainDTO;
using System.Linq;
using System.Threading.Tasks;

namespace RecipiesFounder.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class AccountController : BaseController
    {
        private readonly IJsonWebTokenService _jsonWebTokenService;
        public AccountController(IUnitOfWorkForServices unitOfWorkForServices,IJsonWebTokenService jsonWebTokenService) : base(unitOfWorkForServices)
        {
            _jsonWebTokenService = jsonWebTokenService;
        }

        [HttpGet]
        [Route("/api/Account/GetUserInformation")]
        [AllowAnonymous]
        public async Task<IActionResult> GetUserInformation(string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                return StatusCode(ErrorsAndMessages.Number_204, ErrorsAndMessages.NoContent);
            }

            var user = await _unitOfWorkForServices.UserService.GetUserByEmailAsync(email);
            if (user == null)
            {
                return StatusCode(ErrorsAndMessages.Number_400, ErrorsAndMessages.SomethingWentWrong);
            }

            return Ok(new UserGetDTO { 
                Email=user.Email,
                Name=user.Name,
                CreatedRecipies = (await _unitOfWorkForServices.RecipeService.GetAllRecipesByUserEmailAsync(email)).Where(u=>u.IsPublic).Count()
            });
        }

        [HttpPost]
        [Route("/api/Account/Login")]
        public async Task<IActionResult> Login(LoginUserDTO loginUserDTO)
        {
            if (loginUserDTO == null)
            {
                return StatusCode(ErrorsAndMessages.Number_204, ErrorsAndMessages.NoContent);
            }

            var user = await _unitOfWorkForServices.UserService.GetUserByEmailAsync(loginUserDTO.Email);

            if (user == null)
            {
                return StatusCode(ErrorsAndMessages.Number_404, ErrorsAndMessages.InvalidEmail);
            }

            if (string.IsNullOrEmpty(user.Password))
            {
                return StatusCode(ErrorsAndMessages.Number_404, ErrorsAndMessages.DecryptionError);
            }

            if (user.Password != loginUserDTO.Password)
            {
                return StatusCode(ErrorsAndMessages.Number_404, ErrorsAndMessages.InvalidPassword);
            }

            var jWToken = _jsonWebTokenService.GenerateToken(user);
            HttpContext.Session.SetString("Token", jWToken.accessToken);

            if (await _unitOfWorkForServices.UserService.UpdateUserInfoAsync(user))
            {

                return Ok(new JObject()
                {
                    {"AccessToken", jWToken.accessToken},
                    {"AccessTokenExp", jWToken.exp}
                });
            }

            return StatusCode(ErrorsAndMessages.Number_400, ErrorsAndMessages.SomethingWentWrong);
        }
        [HttpPost]
        [Route("/api/Account/Register")]
        public async Task<IActionResult> Register(RegisterUserDTO registerUserDTO)
        {
            if (registerUserDTO == null || string.IsNullOrEmpty(registerUserDTO.Email))
            {
                return StatusCode(ErrorsAndMessages.Number_204, ErrorsAndMessages.NoContent);
            }

            if (await _unitOfWorkForServices.UserService.GetUserByEmailAsync(registerUserDTO.Email) != null)
            {
                return StatusCode(ErrorsAndMessages.Number_409, ErrorsAndMessages.UserAlreadyExistLogin);
            }

            var user = new User
            {
                Email = registerUserDTO.Email,
                Name = registerUserDTO.Fullname,
                Password = registerUserDTO.Password         
            };

            var jWToken = _jsonWebTokenService.GenerateToken(user);
            HttpContext.Session.SetString("Token", user.AccessToken);

            user.AccessToken = jWToken.accessToken;
            user.AccessTokenExpDate = jWToken.exp;

            if (await _unitOfWorkForServices.UserService.InsertUserAsync(user))
            {
                return StatusCode(ErrorsAndMessages.Number_201, new JObject()
                {
                    {"AccessToken", jWToken.accessToken},
                    {"AccessTokenExp", jWToken.exp}
                });
            }

            return StatusCode(ErrorsAndMessages.Number_400, ErrorsAndMessages.SomethingWentWrong);
        }

    }
}
