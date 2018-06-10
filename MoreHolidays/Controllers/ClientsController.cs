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
    public class ClientsController : Controller
    {
        // GET: Clients
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult ClientsList(int? pageNo)
        {
            var page = pageNo ?? 0;
            List<Client> model = new List<Client>();
            try
            {
                model = ClientsLogic.GetClientsList(page);
            }
            catch (Exception e)
            {
                LogsLogic.InsertLog(new Log()
                {
                    Message = e.Message,
                    StackTrace = e.StackTrace,
                    StoryName = "MoreHolidays/Clients/ClientsList",
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
        public ActionResult Create(Client client)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    if (Session["PublicImageUrl"] != null)
                    {
                        client.ImgUrl = Session["PublicImageUrl"].ToString();
                    }
                    else
                    {
                        client.ImgUrl = null;
                    }
                    ClientsLogic.InsertNewClient(client);
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
                        StoryName = "MoreHolidays/Clients/Create(Post)"
                    });
                    Session["PublicImageUrl"] = "";
                    return View(client);
                    //Parameters = new JavaScriptSerializer().Serialize(project)
                }

            }
            return View(client);
        }

        public ActionResult Edit(int id)
        {
            Client client = new Client();
            try
            {
                client = ClientsLogic.GetClientById(id);
            }
            catch (Exception e)
            {
                LogsLogic.InsertLog(new Log()
                {
                    Message = e.Message,
                    StackTrace = e.StackTrace,
                    StoryName = "MoreHolidays/Clients/Edit(Get)",
                    Parameters = "id=" + id
                });
                Session["PublicImageUrl"] = "";
            }
            return View("Edit", client);
        }


        [HttpPost]
        public ActionResult Edit(Client client)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    if (Session["PublicImageUrl"] != null)
                    {
                        client.ImgUrl = Session["PublicImageUrl"].ToString();
                    }
                    ClientsLogic.UpdateClient(client);
                    Session["PublicImageUrl"] = "";
                    return RedirectToAction("Index");
                }
                catch (Exception e)
                {
                    LogsLogic.InsertLog(new Log()
                    {
                        Message = e.Message,
                        StackTrace = e.StackTrace,
                        StoryName = "MoreHolidays/Clients/Edit(Post)",
                    });
                    Session["PublicImageUrl"] = "";

                    return View(client);
                }
            }
            return View(client);
        }

        public ActionResult Delete(int id)
        {
            try
            {
                ClientsLogic.DeleteClient(id);
            }
            catch (Exception e)
            {
                LogsLogic.InsertLog(new Log()
                {
                    Message = e.Message,
                    StackTrace = e.StackTrace,
                    StoryName = "MoreHolidays/Clients/Delete",
                    Parameters = "id=" + id
                });
            }
            return RedirectToAction("Index");
        }
    }
}