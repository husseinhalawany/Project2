using System.Collections.Generic;
using System.Web.Mvc;
using System;
using System.Web.Security;
using BussinessLogic.Core;
using DataMapping.Enums;
using DataMapping.Entities;
using DataMapping.Services;
using BusinessLogic.Core;

namespace CPanel.Controllers
{
    [Authorize]
    public class BaseController : Controller
    {
        #region User Session
        private UserDataSession _SessionData;
        public UserDataSession SessionData
        {
            get
            {
                if (Session["UserSession"] == null)
                {
                    InitUserSession();
                }
                return (UserDataSession)Session["UserSession"];
            }
            set
            {
                _SessionData = value;
                Session["UserSession"] = _SessionData;
            }
        }
        private void InitUserSession()
        {
            try
            {
                _SessionData = new UserDataSession()
                {
                    UserName = User.Identity.Name,
                };

                DataMapping.Entities.UserProfile user = AdminLogic.GetAdminByName(User.Identity.Name);
                _SessionData.UserId = user.UserId;
                _SessionData.ProfileImageUrl = user.ProfilePictureUrl;
                if (Roles.IsUserInRole("Admin"))
                {
                    _SessionData.UserRole = UserRoles.Admin;
                }
                
                

                Session["UserSession"] = _SessionData;
            }
            catch (Exception e)
            {
                LogsLogic.InsertLog(new Log()
                {
                    Message = e.Message,
                    StackTrace = e.StackTrace,
                    StoryName = "ManagementProject/Base/InitUserSession"
                });
            }

        }
        #endregion
        

    }
}