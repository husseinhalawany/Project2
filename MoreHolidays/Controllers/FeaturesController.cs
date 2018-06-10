using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DataMapping.Entities;
using BussinessLogic.Core;
using BussinessLogic.Models;
using BusinessLogic.Core;

namespace MvcApplication2.Controllers
{
    [Authorize(Roles ="Admin")]

    public class FeaturesController : Controller
    {
        public ActionResult Index(int solutionId)
        {
            FeatureIndexModel model = new FeatureIndexModel();
            model.SolutionId = solutionId;
            model.SolutionName = SolutionsLogic.GetSolutionById(solutionId).Name;
            return View(model);
        }
        // GET: Features
        public ActionResult FeaturesList( int? pageNo, int solutionId)
        {
            var page = pageNo ?? 0;
            List<Feature> model = new List<Feature>();
            try
            {
                model = FeaturesLogic.GetFeaturesBySolutionId(solutionId,page);
            }
            catch (Exception e)
            {
                LogsLogic.InsertLog(new Log()
                {
                    Message = e.Message,
                    StackTrace = e.StackTrace,
                    StoryName = "MoreHolidays/Features/FeaturesList",
                    Parameters = "& pageNo=" + page
                });
            }

            return View(model);
        }

        public ActionResult Create(int solutionId)
        {
            Feature feature = new Feature();
            feature.SolutionId = solutionId;
            return View(feature);
        }


        [HttpPost]
        public ActionResult Create(Feature feature)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    FeaturesLogic.InsertNewFeature(feature);
                    return RedirectToAction("Index", new { solutionId = feature.SolutionId });
                    // return PartialView("JavascriptRedirect", new JavascriptRedirectModel("/Home/Index"));
                }
                catch (Exception e)
                {
                    LogsLogic.InsertLog(new Log()
                    {
                        Message = e.Message,
                        StackTrace = e.StackTrace,
                        StoryName = "MoreHolidays/Features/Create(Post)"
                    });
                    return View(feature);
                    //Parameters = new JavaScriptSerializer().Serialize(project)
                }

            }
            return View(feature);
        }

        public ActionResult Edit(int id)
        {
            Feature feature = new Feature();
            try
            {
                feature = FeaturesLogic.GetFeatureById(id);
            }
            catch (Exception e)
            {
                LogsLogic.InsertLog(new Log()
                {
                    Message = e.Message,
                    StackTrace = e.StackTrace,
                    StoryName = "MoreHolidays/Features/Edit(Get)",
                    Parameters = "id=" + id
                });
            }
            return View("Edit", feature);
        }
        [HttpPost]
        public ActionResult Edit(Feature feature)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    FeaturesLogic.UpdateFeature(feature);
                    return RedirectToAction("Index", new { solutionId = feature.SolutionId });
                    //return PartialView("JavascriptRedirect", new JavascriptRedirectModel("/Home/Index"));
                }
                catch (Exception e)
                {
                    LogsLogic.InsertLog(new Log()
                    {
                        Message = e.Message,
                        StackTrace = e.StackTrace,
                        StoryName = "MoreHolidays/Features/Edit(Post)",
                        // Parameters = new JavaScriptSerializer().Serialize(project)
                    });
                    return View(feature);
                }
            }
            return View(feature);
        }

        public ActionResult Delete(int id)
        {
            int solutionIdIndex = FeaturesLogic.GetFeatureById(id).SolutionId;
            try
            {
                FeaturesLogic.DeleteFeature(id);
            }
            catch (Exception e)
            {
                LogsLogic.InsertLog(new Log()
                {
                    Message = e.Message,
                    StackTrace = e.StackTrace,
                    StoryName = "MoreHolidays/Features/Delete",
                    Parameters = "id=" + id
                });
            }
            return RedirectToAction("Index", new { solutionId = solutionIdIndex });

        }




    }
}
