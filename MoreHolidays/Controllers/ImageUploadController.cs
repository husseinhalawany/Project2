using BussinessLogic.Core;
using BussinessLogic.Helpers;
using CPanel.Controllers;
using DataMapping.Entities;
using DataMapping.Services;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace MvcApplication2.Controllers
{
    [Authorize]
    public class ImageUploadController : BaseController
    {
        // GET: ImageUpload
        public ActionResult Index()
        {
            return View();
        }


        [AllowAnonymous]
        public ActionResult UploadDocument(string Url)
        {
            string ImgUrl = "";
            if (Url!=null)
            {
                ImgUrl = Url;
            }
           
            return PartialView("CreateImage", ImgUrl);
        }
        ////[AllowAnonymous]
        ////[HttpPost]
        ////public ActionResult UploadIndexImage(HttpPostedFileBase file)
        ////{
        ////    try
        ////    {
        ////        List<string> content = file.ContentType.Split('/').ToList();
        ////        if (content[0] == "image")
        ////        {
        ////            string userName = "";
        ////            if (SessionData == null)
        ////            {
        ////                userName = SessionData.UserName;
        ////            }
        ////            EditProfileModel generaladmin = EmployeesLogic.GetEditProfileModel(userName);
        ////            string fileName = Path.GetFileName(file.FileName);
        ////            string fileUrl = WebMessaging.UploadMessageAttachment(file, file.ContentType, fileName);
        ////            generaladmin.ImgURL = fileUrl;
        ////            EmployeesLogic.UpdateEmployee(generaladmin);
        ////            EmployeeUsersDetails model = new EmployeeUsersDetails { ImgURL = fileUrl };
        ////            return RedirectToAction("Index", "Home");
        ////        }
        ////        else
        ////        {
        ////            return RedirectToAction("Index", "Home");
        ////        }

        ////    }
        ////    catch (Exception e)
        ////    {
        ////        LogsLogic.InsertLog(new Log()
        ////        {
        ////            Message = e.Message,
        ////            StackTrace = e.StackTrace,
        ////            StoryName = "ManagementProject/ImageUpload/UploadIndexImage",
        ////            Parameters = new JavaScriptSerializer().Serialize(file)
        ////        });
        ////        return RedirectToAction("GeneralError", "Error"); //new { ErrorMessage = Error.ServerNotRespond });
        ////    }


        ////}
        [AllowAnonymous]
        [HttpPost]
        public ActionResult UploadProfileImage(HttpPostedFileBase file)
        {
            
            string fileUrl="";
            float SizeInMegaByte =(float)( file.ContentLength) / (1024  * 1024);
            if (file != null && SizeInMegaByte<=3)
            {
                List<string> content = file.ContentType.Split('/').ToList();
                if (content[0] == "image")
                {
                  
                    string fileName = Path.GetFileName(file.FileName);
                     fileUrl = WebMessaging.UploadMessageAttachment(file, file.ContentType, fileName);
                    //UserDataSession userSession = SessionData;
                   // string ImgUrl = fileUrl;
                    //SessionData = userSession;

                }
                
            }

            else
            {
                return View("MaxSizeImage");
            }

            Session["PublicImageUrl"] = fileUrl;
            return PartialView("CreateImage", fileUrl );
        }
        //[AllowAnonymous]
        //public ActionResult UploadImageToEdit(string imgurl)
        //{
        //    UserDataSession userSession = SessionData;
        //    userSession.ImgUrl = imgurl;
        //    SessionData = userSession;
        //    return PartialView("CreateImage", imgurl);
        //}
        //public ActionResult showimage(string imageUrl)
        //{
        //    return View("ShowImagePartial", imageUrl);
        //}
    }
}