using System.Collections.Generic;
using System.Linq;
using DataMapping.Entities;
using DataMapping.JSONData;
using System;

namespace DataAccess.Repositories
{
    public class LogsRepository
    {
        public static LogData GetFirstOrDefaultLog()
        {
            using (MoreHolidaysDBEntities db = new MoreHolidaysDBEntities())
            {
                LogData logData = db.Logs.Select(a => new LogData()
                {
                    CreateDate = a.CreateDate.Value,
                    Id = a.Id,
                    Message = a.Message,
                    Parameters = a.Parameters,
                    StackTrace = a.StackTrace,
                    StoryName = a.StoryName,
                    Succeeded = true
                }).OrderBy(x => x.StoryName).FirstOrDefault();
                return logData;
            }
        }
        public static int GetLogCountByStoryName(string storyName)
        {
            using (MoreHolidaysDBEntities db = new MoreHolidaysDBEntities())
            {
                return db.Logs.Where(x => x.StoryName == storyName).Count();
            }
        }
        public static int GetLogCount()
        {
            using (MoreHolidaysDBEntities db = new MoreHolidaysDBEntities())
            {
                return db.Logs.Count();
            }
        }
        public static void InsertLog(Log log)
        {
            using (MoreHolidaysDBEntities db = new MoreHolidaysDBEntities())
            {
                log.CreateDate = DateTime.Now;
                db.Logs.Add(log);
                db.SaveChanges();
            }
        }
        public static void DeleteLog(int logId)
        {
            using (MoreHolidaysDBEntities db = new MoreHolidaysDBEntities())
            {
                Log log = db.Logs.FirstOrDefault(a => a.Id == logId);
                if (log != null)
                {
                    db.Logs.Remove(log);
                    db.SaveChanges();
                }
            }
        }
        public static void DeleteLogsByStoryName(string storyName)
        {
            using (MoreHolidaysDBEntities db = new MoreHolidaysDBEntities())
            {
                List<Log> log = db.Logs.Where(a => a.StoryName == storyName).ToList();
                foreach (var item in log)
                {
                    db.Logs.Remove(item);
                    db.SaveChanges();
                }
            }
        }
    }
}