using RecipesFounder.AplicationLogic.Repository.Interface;
using System.Threading.Tasks;

namespace RecipesFounder.AplicationLogic.Repository.UnitOfWork
{
    public interface IUnitOfWork
    {
        IUserRepo UserRepo { get; }
        IRecipeRepo RecipeRepo { get; }
        IRatingRepo RatingRepo { get; }
        IIngredientRepo IngredientRepo { get; }
        ICommentRepo CommentRepo { get; }
        IFavoriteRepo FavoriteRepo { get; }
        Task<int> Commit();
        void LoggMessageError(string message);
        void LoggMessageInfo(string message);
    }
}