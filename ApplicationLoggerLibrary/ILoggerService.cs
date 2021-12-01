using System;

namespace ApplicationLoggerLibrary
{
    public interface ILoggerService
    {
        void LogError(string message);
        void LogInfo(string message);
    }
}
