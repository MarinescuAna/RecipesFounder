using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecipiesFounder
{
    public static class ErrorsAndMessages
    {
        //400 Bad Request
        public static readonly string SomethingWentWrong = "Something went wrong! Please try again or see the logg files.";
        public static readonly string SomethingWentWrongInsert = "Something went wrong during the insertion proces! Please try again or see the logg files.";

        //409 Conflict
        public static readonly string UserAlreadyExistLogin = "A user has already been created using this email address!";

        //204 No Content
        public static readonly string NoContent = "No content was received! Please try again.";

        //404 Not found
        public static readonly string InvalidEmail = "Invalid email address!";
        public static readonly string InvalidPassword = "Invalid password!";
        public static readonly string DecryptionError = "There was a problem decrypting the password, please try again later!";

        //401 Unauthorized
        public static readonly string Unauthorized = "You are not authorized, please log in to the application!";

        //numbers
        public static readonly int Number_201 = 201;
        public static readonly int Number_204 = 204;
        public static readonly int Number_400 = 400;
        public static readonly int Number_401 = 401;
        public static readonly int Number_404 = 404;
        public static readonly int Number_409 = 409;
    }
}
