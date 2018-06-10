using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DataMapping.Entities;
using BussinessLogic.Core;
using BusinessLogic.Core;

namespace CPanel.Controllers
{
    [Authorize(Roles ="Admin")]

    public class ProjectsController : Controller
    {
        // GET: Projects
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult ProjectsList(int? pageNo)
        {
            var page = pageNo ?? 0;
            List<Project> model = new List<Project>();
            try
            {
                model = ProjectsLogic.GetProjectsList(page);
            }
            catch (Exception e)
            {
                LogsLogic.InsertLog(new Log()
                {
                    Message = e.Message,
                    StackTrace = e.StackTrace,
                    StoryName = "MoreHolidays/Projects/ProjectsList",
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
        public ActionResult Create(Project project)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    if (Session["PublicImageUrl"] != null)
                    {
                        project.ImgUrl = Session["PublicImageUrl"].ToString();
                    }
                    else
                    {
                        project.ImgUrl = null;
                    }
                    ProjectsLogic.InsertNewProject(project);
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
                        StoryName = "MoreHolidays/Projects/Create(Post)"
                    });

                    Session["PublicImageUrl"] = "";

                    return View(project);
                    //Parameters = new JavaScriptSerializer().Serialize(project)
                }

            }
            return View(project);
        }

        public ActionResult Edit(int id)
        {
            Project project=new Project();
            try
            {
                project = ProjectsLogic.GetProjectById(id);
            }
            catch (Exception e)
            {
                LogsLogic.InsertLog(new Log()
                {
                    Message = e.Message,
                    StackTrace = e.StackTrace,
                    StoryName = "MoreHolidays/Projects/Edit(Get)",
                    Parameters = "id=" + id
                });
            }
            return View("Edit", project);
        }
        [HttpPost]
        public ActionResult Edit(Project project)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    if (Session["PublicImageUrl"]!=null)
                    {
                        project.ImgUrl = Session["PublicImageUrl"].ToString();
                    }
                    ProjectsLogic.UpdateProject(project);
                    return RedirectToAction("Index");
                    Session["PublicImageUrl"] = "";
                    //return PartialView("JavascriptRedirect", new JavascriptRedirectModel("/Home/Index"));
                }
                catch (Exception e)
                {
                    LogsLogic.InsertLog(new Log()
                    {
                        Message = e.Message,
                        StackTrace = e.StackTrace,
                        StoryName = "MoreHolidays/Projects/Edit(Post)",
                       // Parameters = new JavaScriptSerializer().Serialize(project)
                    });
                    Session["PublicImageUrl"] = "";
                    return View(project);
                }
            }
            return View(project);
        }

        public ActionResult Delete(int id)
        {
            try
            {
                ProjectsLogic.DeleteProject(id);
            }
            catch (Exception e)
            {
                LogsLogic.InsertLog(new Log()
                {
                    Message = e.Message,
                    StackTrace = e.StackTrace,
                    StoryName = "MoreHolidays/Projects/Delete",
                    Parameters = "id=" + id
                });
            }
            return RedirectToAction("Index");
        }




    }
}