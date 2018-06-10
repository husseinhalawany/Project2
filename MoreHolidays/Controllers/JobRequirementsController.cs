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
    [Authorize(Roles = "Admin")]

    public class JobRequirementsController : Controller
    {
        // GET: JobRequirements
        public ActionResult Index(int vacancyId)
        {
            JobRequirementIndexModel model = new JobRequirementIndexModel();
            model.VacancyId = vacancyId;
            model.VacancyName = VacanciesLogic.GetVacancyById(vacancyId).Name;
            return View(model);
        }

        public ActionResult JobRequirementsList(int? pageNo, int vacancyId)
        {
            var page = pageNo ?? 0;
            List<JobRequirement> model = new List<JobRequirement>();
            try
            {
                model = JobRequirementsLogic.GetRequirementsByVacancyId(vacancyId, page);
            }
            catch (Exception e)
            {
                LogsLogic.InsertLog(new Log()
                {
                    Message = e.Message,
                    StackTrace = e.StackTrace,
                    StoryName = "MoreHolidays/JobRequirements/JobRequirementsList",
                    Parameters = "& pageNo=" + page
                });
            }

            return View(model);
        }


        public ActionResult Create(int vacancyId)
        {
            JobRequirement jobRequirement = new JobRequirement();
            jobRequirement.VacancyId = vacancyId;
            return View(jobRequirement);
        }


        [HttpPost]
        public ActionResult Create(JobRequirement jobRequirement)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    JobRequirementsLogic.InsertNewJobRequirement(jobRequirement);
                    return RedirectToAction("Index", new { vacancyId = jobRequirement.VacancyId });
                }
                catch (Exception e)
                {
                    LogsLogic.InsertLog(new Log()
                    {
                        Message = e.Message,
                        StackTrace = e.StackTrace,
                        StoryName = "MoreHolidays/JobRequirements/Create(Post)"
                    });
                    return View(jobRequirement);
                }

            }
            return View(jobRequirement);
        }

        public ActionResult Edit(int id)
        {
            JobRequirement JobRequirement = new JobRequirement();
            try
            {
                JobRequirement = JobRequirementsLogic.GetJobRequirementById(id);
            }
            catch (Exception e)
            {
                LogsLogic.InsertLog(new Log()
                {
                    Message = e.Message,
                    StackTrace = e.StackTrace,
                    StoryName = "MoreHolidays/JobRequirements/Edit(Get)",
                    Parameters = "id=" + id
                });
            }
            return View("Edit", JobRequirement);
        }
        [HttpPost]
        public ActionResult Edit(JobRequirement jobRequirement)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    JobRequirementsLogic.UpdateJobRequirement(jobRequirement);
                    return RedirectToAction("Index", new { vacancyId = jobRequirement.VacancyId });
                }
                catch (Exception e)
                {
                    LogsLogic.InsertLog(new Log()
                    {
                        Message = e.Message,
                        StackTrace = e.StackTrace,
                        StoryName = "MoreHolidays/JobRequirements/Edit(Post)",
                    });
                    return View(jobRequirement);
                }
            }
            return View(jobRequirement);
        }

        public ActionResult Delete(int id)
        {
            int vacancyIdIndex =JobRequirementsLogic.GetJobRequirementById(id).VacancyId;
            try
            {
                JobRequirementsLogic.DeleteJobRequirement(id);
            }
            catch (Exception e)
            {
                LogsLogic.InsertLog(new Log()
                {
                    Message = e.Message,
                    StackTrace = e.StackTrace,
                    StoryName = "MoreHolidays/JobRequirements/Delete",
                    Parameters = "id=" + id
                });
            }
            return RedirectToAction("Index", new { vacancyId = vacancyIdIndex });

        }


    }
}