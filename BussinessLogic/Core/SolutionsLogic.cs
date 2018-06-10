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
    public class SolutionsLogic
    {
        public static List<Solution> GetSolutionsList(int page)
        {
            int takeCount = Config.PageItemCount();
            int skipCount = page * takeCount;
            return SolutionsRepositories.GetSolutionsList(skipCount, takeCount);
        }

        public static Solution GetSolutionById(int id)
        {
            return SolutionsRepositories.GetSolutionById(id);
        }

        public static void InsertNewSolution(Solution solution)
        {
            SolutionsRepositories.InsertNewSolution(solution);
        }

        public static void UpdateSolution(Solution solution)
        {
            SolutionsRepositories.UpdateSolution(solution);
        }

        public static void DeleteSolution(int id)
        {
            SolutionsRepositories.DeleteSolution(id);
        }
    }
}
