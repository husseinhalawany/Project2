using System.Collections.Generic;
using System.Linq;
using DataMapping.Entities;

namespace DataAccess.Repositories
{
    public class SolutionsRepositories
    {
        public static List<Solution> GetSolutionsList(int skipCount, int takeCount)
        {
            using (MoreHolidaysDBEntities db = new MoreHolidaysDBEntities())
            {
                var q = db.Solutions.Where(p => p.IsDeleted == false);
                return q.OrderBy(m=>m.Id).Skip(skipCount).Take(takeCount).ToList();
            }
        }

        public static Solution GetSolutionById(int id)
        {
            using (MoreHolidaysDBEntities db = new MoreHolidaysDBEntities())
            {
                return db.Solutions.FirstOrDefault(a => a.Id == id && a.IsDeleted == false);
            }
        }

        public static void InsertNewSolution(Solution solution)
        {
            using (MoreHolidaysDBEntities db = new MoreHolidaysDBEntities())
            {
                db.Solutions.Add(solution);
                db.SaveChanges();
            }
        }

        public static void UpdateSolution(Solution solution)
        {
            using (MoreHolidaysDBEntities db = new MoreHolidaysDBEntities())
            {
                var q = db.Solutions.FirstOrDefault(a => a.Id == solution.Id);
                if (q != null)
                {
                    q.Name = solution.Name;
                    q.ArabicName = solution.ArabicName;
                    q.Overview = solution.Overview;
                    q.ArabicOverview = solution.Overview;
                    q.ImgUrl = solution.ImgUrl;
                    db.SaveChanges();
                }
            }
        }

        public static void DeleteSolution(int id)
        {
            using (MoreHolidaysDBEntities db = new MoreHolidaysDBEntities())
            {
                var q = db.Solutions.FirstOrDefault(a => a.Id == id);
                if (q != null)
                {
                    q.IsDeleted = true;
                    db.SaveChanges();
                }
            }
        }
    }
}
