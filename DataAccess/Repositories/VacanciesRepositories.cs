using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataMapping.Entities;

namespace DataAccess.Repositories
{
    public class VacanciesRepositories
    {
        public static List<Vacancy> GetVacanciesList(int skipCount, int takeCount)
        {
            using (MoreHolidaysDBEntities db = new MoreHolidaysDBEntities())
            {
                var q = db.Vacancies.Where(p => p.IsDeleted == false);
                return q.OrderBy(m => m.Id).Skip(skipCount).Take(takeCount).ToList();
            }
        }

        public static Vacancy GetVacancyById(int id)
        {
            using (MoreHolidaysDBEntities db = new MoreHolidaysDBEntities())
            {
                return db.Vacancies.FirstOrDefault(a => a.Id == id && a.IsDeleted == false);
            }
        }

        public static void InsertNewVacancy(Vacancy vacancy)
        {
            using (MoreHolidaysDBEntities db = new MoreHolidaysDBEntities())
            {
                db.Vacancies.Add(vacancy);
                db.SaveChanges();
            }
        }

        public static void UpdateVacancy(Vacancy vacancy)
        {
            using (MoreHolidaysDBEntities db = new MoreHolidaysDBEntities())
            {
                var q = db.Vacancies.FirstOrDefault(a => a.Id == vacancy.Id);
                if (q != null)
                {
                    q.Name = vacancy.Name;
                    q.ArabicName = vacancy.ArabicName;
                    db.SaveChanges();
                }
            }
        }

        public static void DeleteVacancy(int id)
        {
            using (MoreHolidaysDBEntities db = new MoreHolidaysDBEntities())
            {
                var q = db.Vacancies.FirstOrDefault(a => a.Id == id);
                if (q != null)
                {
                    q.IsDeleted = true;
                    db.SaveChanges();
                }
            }
        }

    }
}
