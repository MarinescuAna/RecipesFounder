using RecipesFounder.AplicationLogic.Service.Interface;

namespace RecipesFounder.AplicationLogic.Service.UnitOfWork
{
    public interface IUnitOfWorkForServices
    {
        IUserService UserService { get; }
        ICommentService CommentService { get; }
        IRatingService RatingService { get; }
    }
}