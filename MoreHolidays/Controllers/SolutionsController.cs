using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DataMapping.Entities;
using BussinessLogic.Core;
using BusinessLogic.Core;

namespace MvcApplication2.Controllers
{
    [Authorize(Roles ="Admin")]

    public class SolutionsController : Controller
    {
        // GET: Solutions
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult SolutionsList(int? pageNo)
        {
            var page = pageNo ?? 0;
            List<Solution> model = new List<Solution>();
            try
            {
                model = SolutionsLogic.GetSolutionsList(page);
            }
            catch (Exception e)
            {
                LogsLogic.InsertLog(new Log()
                {
                    Message = e.Message,
                    StackTrace = e.StackTrace,
                    StoryName = "MoreHolidays/Solutions/SolutionsList",
                    Parameters = "& pageNo=" + page
                });
            }

            return View(model);
        }

        public ActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Create(Solution solution)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    if(Session["PublicImageUrl"]!=null)
                    {
                        solution.ImgUrl = Session["PublicImageUrl"].ToString();
                    }
                    else
                    {
                        solution.ImgUrl = null;
                    }
                    SolutionsLogic.InsertNewSolution(solution);
                    Session["PublicImageUrl"] = "";
                    return RedirectToAction("Index");
                    
                    // return PartialView("JavascriptRedirect", new JavascriptRedirectModel("/Home/Index"));
                }
                catch (Exception e)
                {
                    LogsLogic.InsertLog(new Log()
                    {
                        Message = e.Message,
                        StackTrace = e.StackTrace,
                        StoryName = "MoreHolidays/Solutions/Create(Post)"
                    });
                    Session["PublicImageUrl"] = "";
                    return View(solution);
                    //Parameters = new JavaScriptSerializer().Serialize(project)
                }

            }
            return View(solution);
        }


        public ActionResult Edit(int id)
        {
            Solution Solution = new Solution();
            try
            {
                Solution = SolutionsLogic.GetSolutionById(id);
            }
            catch (Exception e)
            {
                LogsLogic.InsertLog(new Log()
                {
                    Message = e.Message,
                    StackTrace = e.StackTrace,
                    StoryName = "MoreHolidays/Solutions/Edit(Get)",
                    Parameters = "id=" + id
                });
                Session["PublicImageUrl"] = "";
            }
            return View("Edit", Solution);
        }


        [HttpPost]
        public ActionResult Edit(Solution Solution)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    if (Session["PublicImageUrl"] != null)
                    {
                        Solution.ImgUrl = Session["PublicImageUrl"].ToString();
                    }
                    SolutionsLogic.UpdateSolution(Solution);
                    Session["PublicImageUrl"] = "";
                    return RedirectToAction("Index");
                }
                catch (Exception e)
                {
                    LogsLogic.InsertLog(new Log()
                    {
                        Message = e.Message,
                        StackTrace = e.StackTrace,
                        StoryName = "MoreHolidays/Solutions/Edit(Post)",
                    });
                    Session["PublicImageUrl"] = "";

                    return View(Solution);
                }
            }
            return View(Solution);
        }

        public ActionResult Delete(int id)
        {
            try
            {
                SolutionsLogic.DeleteSolution(id);
            }
            catch (Exception e)
            {
                LogsLogic.InsertLog(new Log()
                {
                    Message = e.Message,
                    StackTrace = e.StackTrace,
                    StoryName = "MoreHolidays/Solutions/Delete",
                    Parameters = "id=" + id
                });
            }
            return RedirectToAction("Index");
        }
    }
}