using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DataMapping.Entities;
using BussinessLogic.Core;
using WebMatrix.WebData;
using System.Web.Security;
using CPanel.Models;
using System.Web.Routing;
using CPanel.Filters;
using DataMapping.Enums;
using CPanel.Controllers;
using BusinessLogic.Core;
using BussinessLogic.Model;

namespace MvcApplication2.Controllers
{
    [Authorize(Roles ="Admin")]
    [InitializeSimpleMembership]
    public class UsersController : BaseController
    {

        public IFormsAuthenticationService FormsService { get; set; }
        public IMembershipService MembershipService { get; set; }
        protected override void Initialize(RequestContext requestContext)
        {
            if (FormsService == null) { FormsService = new FormsAuthenticationService(); }
            if (MembershipService == null) { MembershipService = new AccountMembershipService(); }

            base.Initialize(requestContext);
        }


        // GET: Users
        public ActionResult Index(int roleId)
        {
            DataMapping.Entities.UserProfile user = new DataMapping.Entities.UserProfile();
            user.RolesId = roleId;
            return View(user);
        }

        public ActionResult UsersList (int? pageNo, int RoleId)
        {
            var page = pageNo ?? 0;
            List<DataMapping.Entities.UserProfile> model = new List<DataMapping.Entities.UserProfile>();
            try
            {
                if(RoleId==1)
                {
                    model = AdminLogic.GetAdminList(page);
                }
                }
            catch (Exception e)
            {
                LogsLogic.InsertLog(new Log()
                {
                    Message = e.Message,
                    StackTrace = e.StackTrace,
                    StoryName = "MoreHolidays/Users/UsersList",
                    Parameters = "& pageNo=" + page
                });
            }
            return View(model);
        }
        [AllowAnonymous]

        public ActionResult Create(int roleId)
        {
            DataMapping.Entities.UserProfile user = new DataMapping.Entities.UserProfile { RolesId = roleId };
            return View(user);
        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult Create(DataMapping.Entities.UserProfile User)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    if(Session["PublicImageUrl"]!=null)
                    {
                        User.ProfilePictureUrl = Session["PublicImageUrl"].ToString();
                    }
                    else
                    {
                        User.ProfilePictureUrl = null;
                    }
                    WebSecurity.CreateUserAndAccount(User.UserName, User.Password);
                    if (User.RolesId==1)
                    {
                        DataMapping.Entities.UserProfile userModel = AdminLogic.GetAdminByName(User.UserName);
                        AdminLogic.UpdateAdminById(User, userModel.UserId);
                    }

                    Session["PublicImageUrl"] = "";


                    return RedirectToAction("Index",new { roleId = User.RolesId });
                    // return PartialView("JavascriptRedirect", new JavascriptRedirectModel("/Home/Index"));
                }
                
                catch (Exception e)
                {
                    LogsLogic.InsertLog(new Log()
                    {
                        Message = e.Message,
                        StackTrace = e.StackTrace,
                        StoryName = "MoreHolidays/Users/Create(Post)"
                    });
                    Session["PublicImageUrl"] = "";

                    return View();
                }
                    //Parameters = new JavaScriptSerializer().Serialize(project)

            }
            Session["PublicImageUrl"] = "";

            return View();
        }

        public ActionResult Edit(int id,int RoleId)
        {
            UpdateProfileModel User = new UpdateProfileModel();
            try
            {
                if(RoleId==(int)UserRoles.Admin)
                {
                    User = AdminLogic.GetProfileModelById(id);

                }
            }
            catch (Exception e)
            {
                LogsLogic.InsertLog(new Log()
                {
                    Message = e.Message,
                    StackTrace = e.StackTrace,
                    StoryName = "MoreHolidays/Users/Edit(Get)",
                    Parameters = "id=" + id
                });
            }
            return View("Edit", User);
        }

        [HttpPost]
        public ActionResult Edit(UpdateProfileModel Model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    if (Session["PublicImageUrl"] != null)
                    {
                        Model.ProfilePictureUrl = Session["PublicImageUrl"].ToString();
                    }
                    
                    if (Model.RolesId == (int)UserRoles.Admin)
                    {
                        AdminLogic.UpdateAdmin(Model);
                        Session["UserSession"] = SessionData;
                    }
                    Session["PublicImageUrl"] = "";
                    return RedirectToAction("Index", new { roleId = Model.RolesId });

                }
                catch (Exception e)
                {
                    LogsLogic.InsertLog(new Log()
                    {
                        Message = e.Message,
                        StackTrace = e.StackTrace,
                        StoryName = "MoreHolidays/Users/Edit(Post)",
                    });
                    Session["PublicImageUrl"] = "";
                    return View(Model);
                }
            }
            
            return View(User);
        }

        public ActionResult Delete(int id,int RoleId,bool isLocked)
        {
            try
            {
                AdminLogic.DeleteAdmin(id,isLocked);
            }
            catch (Exception e)
            {
                LogsLogic.InsertLog(new Log()
                {
                    Message = e.Message,
                    StackTrace = e.StackTrace,
                    StoryName = "MoreHolidays/Users/Delete",
                    Parameters = "id=" + id
                });
            }
            return RedirectToAction("Index", new { roleId = RoleId });

        }





    }
}