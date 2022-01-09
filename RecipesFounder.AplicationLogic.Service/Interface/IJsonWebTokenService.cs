using RecipesFounder.DataAccessLayer.Domain.Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace RecipesFounder.AplicationLogic.Service.Interface
{
    public interface IJsonWebTokenService
    {
        (string accessToken, DateTime exp) GenerateToken(User user);
    }
}
