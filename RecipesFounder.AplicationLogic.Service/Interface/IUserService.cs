using RecipesFounder.DataAccessLayer.Domain.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace RecipesFounder.AplicationLogic.Service.Interface
{
    public  interface IUserService
    {
        Task<User> GetUserByEmailAsync(string email);
        Task<bool> UpdateUserInfoAsync(User user);
        Task<bool> InsertUserAsync(User user);
    }
}
