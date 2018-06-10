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

    [Authorize(Roles = "Admin")]

    public class VacanciesController : Controller
    {
        // GET: Vacancies
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult VacanciesList(int? pageNo)
        {
            var page = pageNo ?? 0;
            List<Vacancy> model = new List<Vacancy>();
            try
            {
                model = VacanciesLogic.GetVacanciesList(page);
            }
            catch (Exception e)
            {
                LogsLogic.InsertLog(new Log()
                {
                    Message = e.Message,
                    StackTrace = e.StackTrace,
                    StoryName = "MoreHolidays/Vacancies/VacanciesList",
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
        public ActionResult Create(Vacancy vacancy)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    VacanciesLogic.InsertNewVacancy(vacancy);
                    return RedirectToAction("Index");
                }
                catch (Exception e)
                {
                    LogsLogic.InsertLog(new Log()
                    {
                        Message = e.Message,
                        StackTrace = e.StackTrace,
                        StoryName = "MoreHolidays/Vacancies/Create(Post)"
                    });
                    return View(vacancy);
                }

            }
            return View(vacancy);
        }

         public ActionResult Edit(int id)
         {
            Vacancy vacancy=new Vacancy();
            try
            {
                vacancy = VacanciesLogic.GetVacancyById(id);
            }
            catch (Exception e)
            {
                LogsLogic.InsertLog(new Log()
                {
                    Message = e.Message,
                    StackTrace = e.StackTrace,
                    StoryName = "MoreHolidays/Vacancies/Edit(Get)",
                    Parameters = "id=" + id
                });
            }
            return View("Edit", vacancy);
        }
        [HttpPost]
        public ActionResult Edit(Vacancy vacancy)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    VacanciesLogic.UpdateVacancy(vacancy);
                    return RedirectToAction("Index");
                }
                catch (Exception e)
                {
                    LogsLogic.InsertLog(new Log()
                    {
                        Message = e.Message,
                        StackTrace = e.StackTrace,
                        StoryName = "MoreHolidays/Vacancies/Edit(Post)",
                    });
                    return View(vacancy);
                }
            }
            return View(vacancy);
        }

        public ActionResult Delete(int id)
        {
            try
            {
                VacanciesLogic.DeleteVacancy(id);
            }
            catch (Exception e)
            {
                LogsLogic.InsertLog(new Log()
                {
                    Message = e.Message,
                    StackTrace = e.StackTrace,
                    StoryName = "MoreHolidays/Vacancies/Delete",
                    Parameters = "id=" + id
                });
            }
            return RedirectToAction("Index");
        }





    }
}