using DataMapping.Entities;
using DataAccess.Repositories;

namespace BusinessLogic.Core
{
    public class LogsLogic
    {
        public static void InsertLog(Log log)
        {
            LogsRepository.InsertLog(log);
        }
    }
}
