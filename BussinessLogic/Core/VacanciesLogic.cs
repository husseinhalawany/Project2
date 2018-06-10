using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataMapping.Entities;
using DataAccess.Repositories;
using BussinessLogic.Helpers;

namespace BussinessLogic.Core
{
    public class VacanciesLogic
    {
        public static List<Vacancy> GetVacanciesList(int page)
        {
            int takeCount = Config.PageItemCount();
            int skipCount = page * takeCount;
            return VacanciesRepositories.GetVacanciesList(skipCount, takeCount);
        }

        public static Vacancy GetVacancyById(int id)
        {
            return VacanciesRepositories.GetVacancyById(id);
        }

        public static void InsertNewVacancy(Vacancy vacancy)
        {
            VacanciesRepositories.InsertNewVacancy(vacancy);
        }

        public static void UpdateVacancy(Vacancy vacancy)
        {
            VacanciesRepositories.UpdateVacancy(vacancy);
        }

        public static void DeleteVacancy(int id)
        {
            VacanciesRepositories.DeleteVacancy(id);
        }
    }
}
