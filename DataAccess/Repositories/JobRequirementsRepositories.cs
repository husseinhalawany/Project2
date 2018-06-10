using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataMapping.Entities;

namespace DataAccess.Repositories
{
    public class JobRequirementsRepositories
    {
        public static List<JobRequirement> GetRequirementsByVacancyId(int vacancyId, int skipCount, int takeCount)
        {
            using (MoreHolidaysDBEntities db = new MoreHolidaysDBEntities())
            {
                var q = db.JobRequirements.Where(f => f.VacancyId == vacancyId & f.IsDeleted == false).ToList();
                return q.Skip(skipCount).Take(takeCount).ToList();
            }
        }

         public static JobRequirement GetJobRequirementById(int id)
         {
            using (MoreHolidaysDBEntities db = new MoreHolidaysDBEntities())
            {
                return db.JobRequirements.FirstOrDefault(a => a.Id == id && a.IsDeleted == false);
            }
         }

        public static void InsertNewJobRequirement(JobRequirement jobRequirement)
        {
            using (MoreHolidaysDBEntities db = new MoreHolidaysDBEntities())
            {
                db.JobRequirements.Add(jobRequirement);
                db.SaveChanges();
            }
        }

        public static void UpdateJobRequirement(JobRequirement jobRequirement)
        {
            using (MoreHolidaysDBEntities db = new MoreHolidaysDBEntities())
            {
                var q = db.JobRequirements.FirstOrDefault(a => a.Id == jobRequirement.Id);
                if (q != null)
                {
                    q.Details = jobRequirement.Details;
                    q.ArabicDetails = jobRequirement.ArabicDetails;
                    db.SaveChanges();
                }
            }
        }

        public static void DeleteJobRequirement(int id)
        {
            using (MoreHolidaysDBEntities db = new MoreHolidaysDBEntities())
            {
                var q = db.JobRequirements.FirstOrDefault(a => a.Id == id);
                if (q != null)
                {
                    q.IsDeleted = true;
                    db.SaveChanges();
                }
            }
        }




    }
}
