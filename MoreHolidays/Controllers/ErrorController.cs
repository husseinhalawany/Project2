using BusinessLogic.Core;
using BussinessLogic.Core;
using BussinessLogic.Model;
using DataMapping.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MvcApplication2.Controllers
{
    public class ErrorController : Controller
    {
        // GET: Error

        [Authorize]
        public ActionResult GeneralError(string errorMessage = null, string parameter = null)
        {
            string path = "";
            if (errorMessage != null)
            {
                if (Request.UrlReferrer != null) path = Request.UrlReferrer.AbsolutePath;
            }

            ReloadURLModel Model = new ReloadURLModel { URL = path, Message = errorMessage };
            if (errorMessage == null)
                errorMessage = "An Error Occured";

            LogsLogic.InsertLog(new Log()
            {
                Message = errorMessage,
                StoryName = path,
                Parameters = parameter
            });

            return View(Model);
        }
    }
}