using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataMapping.Entities;

namespace DataAccess.Repositories
{
    public class FeaturesRepositories
    {
        public static List<Feature> GetFeaturesBySolutionId(int solutionId, int skipCount, int takeCount)
        {
            using (MoreHolidaysDBEntities db=new MoreHolidaysDBEntities())
            {
                var q=db.Features.Where(f=>f.SolutionId==solutionId && f.IsDeleted==false).ToList();
                return q.Skip(skipCount).Take(takeCount).ToList();
            }
        }

        public static Feature GetFeatureById(int id)
        {
            using (MoreHolidaysDBEntities db = new MoreHolidaysDBEntities())
            {
                return db.Features.FirstOrDefault(a => a.Id == id && a.IsDeleted== false);
            }
        }

        public static void InsertNewFeature(Feature feature)
        {
            using (MoreHolidaysDBEntities db = new MoreHolidaysDBEntities())
            {
                feature.CreateDate = DateTime.Now;
                db.Features.Add(feature);
                db.SaveChanges();
            }
        }

        public static void UpdateFeature(Feature feature)
        {
            using (MoreHolidaysDBEntities db = new MoreHolidaysDBEntities())
            {
                var q = db.Features.FirstOrDefault(a => a.Id == feature.Id);
                if (q != null)
                {
                    q.LastUpdateDate = DateTime.Now;
                    q.Name = feature.Name;
                    q.ArabicName = feature.ArabicName;
                    q.Description = feature.Description;
                    q.ArabicDescription = feature.ArabicDescription;
                    db.SaveChanges();
                }
            }
        }

        public static void DeleteFeature(int id)
        {
            using (MoreHolidaysDBEntities db = new MoreHolidaysDBEntities())
            {
                var q = db.Features.FirstOrDefault(a => a.Id == id);
                if (q != null)
                {
                    q.IsDeleted = true;
                    db.SaveChanges();
                }
            }
        }
    }
}
