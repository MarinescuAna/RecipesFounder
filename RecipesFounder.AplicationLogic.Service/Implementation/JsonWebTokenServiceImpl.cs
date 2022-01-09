using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using RecipesFounder.AplicationLogic.Service.Interface;
using RecipesFounder.DataAccessLayer.Domain.Domain;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace RecipesFounder.AplicationLogic.Service.Implementation
{
    public class JsonWebTokenServiceImpl: IJsonWebTokenService
    {
        private readonly IConfiguration _configuration;
        public JsonWebTokenServiceImpl(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public (string accessToken, DateTime exp) GenerateToken(User user)
        {
            (string accessToken, DateTime exp) token;
            user.AccessToken = token.accessToken = GenerateToken(user.Name,user.Email);
            user.AccessTokenExpDate = token.exp = DateTime.Now.AddHours(2);
            return token;
        }
        private string GenerateToken(string userName, string userEmail)
        {
           
            var key = Encoding.ASCII.GetBytes(_configuration["SecretKey"]);
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] {
                    new Claim(ClaimTypes.Email, userEmail),
                    new Claim(ClaimTypes.Name, userName)
                }),
                Expires = DateTime.UtcNow.AddHours(2),

                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);
            return tokenString;
        }

    }
}
