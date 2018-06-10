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
    public class JobRequirementsLogic
    {
        public static List<JobRequirement> GetRequirementsByVacancyId(int vacancyId, int page)
        {
            int takeCount = Config.PageItemCount();
            int skipCount = page * takeCount;
            return JobRequirementsRepositories.GetRequirementsByVacancyId(vacancyId,skipCount,takeCount);
        }

        public static JobRequirement GetJobRequirementById(int id)
        {
            return JobRequirementsRepositories.GetJobRequirementById(id);
        }

        public static void InsertNewJobRequirement(JobRequirement JobRequirement)
        {
            JobRequirementsRepositories.InsertNewJobRequirement(JobRequirement);
        }

        public static void UpdateJobRequirement(JobRequirement jobRequirement)
        {
            JobRequirementsRepositories.UpdateJobRequirement(jobRequirement);
        }

        public static void DeleteJobRequirement(int id)
        {
            JobRequirementsRepositories.DeleteJobRequirement(id);
        }
    }
}
