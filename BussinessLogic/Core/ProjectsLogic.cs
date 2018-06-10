using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.Repositories;
using DataMapping.Entities;
using BussinessLogic.Helpers;

namespace BussinessLogic.Core
{
    public class ProjectsLogic
    {
        public static List<Project> GetProjectsList(int page)
        {
            int takeCount = Config.PageItemCount();
            int skipCount = page * takeCount;
            return ProjectsRepositories.GetProjectsList(skipCount, takeCount);
        }

        public static Project GetProjectById(int id)
        {
            return ProjectsRepositories.GetProjectById(id);
        }

        public static void InsertNewProject(Project project)
        {
            ProjectsRepositories.InsertNewProject(project);
        }

        public static void UpdateProject(Project project)
        {
            ProjectsRepositories.UpdateProject(project);
        }

        public static void DeleteProject(int id)
        {
            ProjectsRepositories.DeleteProject(id);
        }
    }
}
