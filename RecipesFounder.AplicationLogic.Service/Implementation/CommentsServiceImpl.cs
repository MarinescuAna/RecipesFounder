using RecipesFounder.AplicationLogic.Repository.UnitOfWork;
using RecipesFounder.AplicationLogic.Service.Interface;
using RecipesFounder.DataAccessLayer.Domain.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RecipesFounder.AplicationLogic.Service.Implementation
{
    public class CommentsServiceImpl : BaseService, ICommentService
    {
        public CommentsServiceImpl(IUnitOfWork unitOfwork) : base(unitOfwork)
        {
        }

        public async Task<List<Comment>> GetComments(int recipeId, bool isExtern) =>
          (await _unitOfWork.CommentRepo.GetItems())
            .Where(u => (isExtern && u.ExternalRecipe == recipeId) || (!isExtern && u.RecipeID == recipeId)).ToList();

        public async Task<bool> InsertCommentAsync(Comment comment)
        {
            _unitOfWork.CommentRepo.InsertItem(comment);

            return (await _unitOfWork.Commit()) > 0;
        }
    }
}
