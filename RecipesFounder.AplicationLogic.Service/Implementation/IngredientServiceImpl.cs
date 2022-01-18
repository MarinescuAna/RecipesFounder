using RecipesFounder.AplicationLogic.Repository.UnitOfWork;
using RecipesFounder.AplicationLogic.Service.Interface;
using RecipesFounder.DataAccessLayer.Domain.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace RecipesFounder.AplicationLogic.Service.Implementation
{
    public class IngredientServiceImpl : BaseService, IIngredientService
    {
        public IngredientServiceImpl(IUnitOfWork unitOfwork) : base(unitOfwork)
        {
        }

        
    }
}
