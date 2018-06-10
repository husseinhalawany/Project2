using System.Collections.Generic;
using System.Linq;
using DataMapping.Entities;
using System;

namespace DataAccess.Repositories
{
    public class ProjectsRepositories
    {
        public static List<Project> GetProjectsList(int skipCount, int takeCount)
        {
            using (MoreHolidaysDBEntities db =new MoreHolidaysDBEntities())
            {
                var q= db.Projects.Where(p => p.IsDeleted == false);
                return q.OrderBy(m=>m.Id).Skip(skipCount).Take(takeCount).ToList();
            }
        }

        public static Project GetProjectById(int id)
        {
            using (MoreHolidaysDBEntities db = new MoreHolidaysDBEntities())
            {
                return db.Projects.FirstOrDefault(a => a.Id == id && a.IsDeleted == false);
            }
        }

        public static void InsertNewProject(Project project)
        {
            using (MoreHolidaysDBEntities db = new MoreHolidaysDBEntities())
            {
                project.CreateDate = DateTime.Now;
                db.Projects.Add(project);
                db.SaveChanges();
            }
        }

        public static void UpdateProject(Project project)
        {
            using (MoreHolidaysDBEntities db = new MoreHolidaysDBEntities())
            {
                var q = db.Projects.FirstOrDefault(a => a.Id == project.Id);
                if (q != null)
                {
                    q.LastUpdateDate= DateTime.Now;
                    q.Name = project.Name;
                    q.ArabicName = project.ArabicName;
                    q.Description = project.Description;
                    q.ArabicDescription = project.ArabicDescription;
                    db.SaveChanges();
                }
            }
        }

        public static void DeleteProject(int id)
        {
            using (MoreHolidaysDBEntities db = new MoreHolidaysDBEntities())
            {
                var q = db.Projects.FirstOrDefault(a => a.Id == id);
                if (q != null)
                {
                    q.IsDeleted = true;
                    db.SaveChanges();
                }
            }
        }
    }
}
