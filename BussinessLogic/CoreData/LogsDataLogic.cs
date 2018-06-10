using BusinessLogic.Models;
using DataAccess.Repositories;

namespace BusinessLogic.CoreData
{
    public class LogsDataLogic
    {
        public static void DeleteLogB(int logId)
        {
            LogsRepository.DeleteLog(logId);
        }
        public static LogDataIndexModel GetLogDataIndexModel()
        {
            LogDataIndexModel model = new LogDataIndexModel()
            {
                LogCount = LogsRepository.GetLogCount()
            };
            if (model.LogCount > 0)
            {
                model.LogData = LogsRepository.GetFirstOrDefaultLog();
                model.CountStoryLog = LogsRepository.GetLogCountByStoryName(model.LogData.StoryName);
            }
            model.Succeeded = true;
            return model;
        }
        public static void DeleteLogsByStoryName(string storyName)
        {
            LogsRepository.DeleteLogsByStoryName(storyName);
        }
    }
}
