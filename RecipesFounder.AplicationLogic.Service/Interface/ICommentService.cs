using RecipesFounder.DataAccessLayer.Domain.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace RecipesFounder.AplicationLogic.Service.Interface
{
    public interface ICommentService
    {
        Task<bool> InsertCommentAsync(Comment comment);
        Task<List<Comment>> GetComments(int recipeId, bool isExtern);
    }
}
