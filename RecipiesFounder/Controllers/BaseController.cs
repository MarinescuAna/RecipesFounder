using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RecipesFounder.AplicationLogic.Service.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace RecipiesFounder.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseController : ControllerBase
    {
        protected IUnitOfWorkForServices _unitOfWorkForServices;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public BaseController(IUnitOfWorkForServices unitOfWorkForServices, IHttpContextAccessor httpContextAccessor = null)
        {
            _unitOfWorkForServices = unitOfWorkForServices;
            _httpContextAccessor = httpContextAccessor;
        }
        protected string ExtractEmailFromJWT()
        {
            return HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
        }

    }
}
