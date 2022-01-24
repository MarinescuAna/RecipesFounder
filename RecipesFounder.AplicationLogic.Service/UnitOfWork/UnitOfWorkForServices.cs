using RecipesFounder.AplicationLogic.Repository.UnitOfWork;
using RecipesFounder.AplicationLogic.Service.Implementation;
using RecipesFounder.AplicationLogic.Service.Interface;
using System;
using System.Collections.Generic;
using System.Text;

namespace RecipesFounder.AplicationLogic.Service.UnitOfWork
{
    public class UnitOfWorkForServices : IUnitOfWorkForServices
    {
        private readonly IUnitOfWork _unitOfWork;
        private IUserService _userService;
        private ICommentService _commentService;
        private IRatingService _ratingService;
        private IRecipeService _recipeService;
        private IFavoriteService _favoriteService;
        public UnitOfWorkForServices(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public IRatingService RatingService
        {
            get
            {
                if (_ratingService == null)
                {
                    _ratingService = new RatingServiceImpl(_unitOfWork);
                }

                return _ratingService;
            }
        }
        public ICommentService CommentService
        {
            get
            {
                if (_commentService == null)
                {
                    _commentService = new CommentsServiceImpl(_unitOfWork);
                }

                return _commentService;
            }
        }
        public IUserService UserService
        {
            get
            {
                if (_userService == null)
                {
                    _userService = new UserServiceImpl(_unitOfWork);
                }

                return _userService;
            }
        }

        public IRecipeService RecipeService
        {
            get
            {
                if (_recipeService == null)
                {
                    _recipeService = new RecipeServiceImpl(_unitOfWork);
                }

                return _recipeService;
            }
        }

        public IFavoriteService FavoriteService
        {
            get
            {
                if (_favoriteService == null)
                {
                    _favoriteService = new FavoriteServiceImpl(_unitOfWork);
                }

                return _favoriteService;
            }
        }
    }
}