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
    public class FeaturesLogic
    {
        public static List<Feature> GetFeaturesBySolutionId(int solutionId, int page)
        {
            int takeCount = Config.PageItemCount();
            int skipCount = page * takeCount;
            return FeaturesRepositories.GetFeaturesBySolutionId(solutionId, skipCount, takeCount);
        }

        public static Feature GetFeatureById(int id)
        {
            return FeaturesRepositories.GetFeatureById(id);
        }

        public static void InsertNewFeature(Feature feature)
        {
            FeaturesRepositories.InsertNewFeature(feature); 
        }

        public static void UpdateFeature(Feature feature)
        {
            FeaturesRepositories.UpdateFeature(feature);
        }

        public static void DeleteFeature(int id)
        {
            FeaturesRepositories.DeleteFeature(id);
        }

    }
}
