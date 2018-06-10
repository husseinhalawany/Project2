using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DataMapping.Services;
using BussinessLogic.Core;
using DataMapping.Entities;
using System.Web.Security;
using WebMatrix.WebData;
using CPanel.Controllers;
using BusinessLogic.Core;

namespace MvcApplication2.Controllers
{
    public class ProfileController : BaseController
    {
        // GET: Profile
        public ActionResult ChangePassword()
        {
            ChangePasswordDetails password = new ChangePasswordDetails();
            int id=SessionData.UserId;
            try
            {
                password = AdminLogic.GetChangePasswordDetails(SessionData.UserId);
            }
            catch (Exception e)
            {
                LogsLogic.InsertLog(new Log()
                {
                    Message = e.Message,
                    StackTrace = e.StackTrace,
                    StoryName = "ManagmentProject/Profile/ChangePassword"
                });
                //return RedirectToAction("GeneralError", "Error", new { ErrorMessage = Error.ServerNotRespond });
            }
            return View(password);
        }

        [HttpPost]
        public ActionResult ChangePassword(ChangePasswordDetails changePasswordModel)
        {
            if (ModelState.IsValid)
            {
                if (Membership.ValidateUser(changePasswordModel.UserName, changePasswordModel.OldPassword))
                {
                    WebSecurity.ChangePassword(changePasswordModel.UserName, changePasswordModel.OldPassword, changePasswordModel.NewPassword);
                    return RedirectToAction("Index", "Home");
                }
                else
                    ModelState.AddModelError("OldPassword", "wrong password");
            }
            return View("ChangePassword", changePasswordModel);
        }
    }
}