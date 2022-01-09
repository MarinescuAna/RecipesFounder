using RecipesFounder.AplicationLogic.Repository.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Text;

namespace RecipesFounder.AplicationLogic.Service.Implementation
{
    public abstract class BaseService
    {
        protected IUnitOfWork _unitOfWork;
        public BaseService(IUnitOfWork unitOfwork)
        {
            _unitOfWork = unitOfwork;
        }
    }
}
