using NLog;
namespace ApplicationLoggerLibrary
{
    public class LoggerService:ILoggerService
    {
        private static readonly ILogger logger = LogManager.GetCurrentClassLogger();

        public void LogError(string message)
        {
            logger.Error(message);
        }

        public void LogInfo(string message)
        {
            logger.Info(message);
        }

    }
}

