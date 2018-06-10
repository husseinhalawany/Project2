using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using System.IO;
using BusinessLogic.Helpers;

namespace CPanel.Controllers
{
    public class HomeController : BaseController
    {
        public ActionResult Index()
         {
           
            return View(SessionData);
        }
       
        [AllowAnonymous]
        public ActionResult Soon()
        {
            return View();
        }
    }
}