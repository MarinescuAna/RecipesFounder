using RecipesFounder.AplicationLogic.Repository.UnitOfWork;
using RecipesFounder.AplicationLogic.Service.Interface;
using RecipesFounder.DataAccessLayer.Domain.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace RecipesFounder.AplicationLogic.Service.Implementation
{
    public class UserServiceImpl : BaseService, IUserService
    {
        public UserServiceImpl(IUnitOfWork unitOfwork) : base(unitOfwork)
        {
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            var user = await _unitOfWork.UserRepo.GetItem(u => u.Email == email);
            return user;
        }

        public async Task<bool> UpdateUserInfoAsync(User user)
        {
            await _unitOfWork.UserRepo.UpdateItem(user);

            return (await _unitOfWork.Commit()) > 0;
        }
        public async Task<bool> InsertUserAsync(User user)
        {
            _unitOfWork.UserRepo.InsertItem(user);

            return (await _unitOfWork.Commit()) > 0;
        }
    }
}
