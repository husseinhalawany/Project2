using BusinessLogic.Core;
using BusinessLogic.CoreData;
using BusinessLogic.Helpers;
using BusinessLogic.Models;
using CPanel.Controllers;
using DataMapping.Entities;

using DataMapping.JSONData;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace B2B.Controllers
{
    [Authorize(Roles = "Admin")]
    public class LogsController : BaseController
    {
        // GET: Logs
        public ActionResult Index()
        {
            LogDataIndexModel logDataIndexModel;
            try
            {
                logDataIndexModel = LogsDataLogic.GetLogDataIndexModel();
            }
            catch (Exception e)
            {
                LogsLogic.InsertLog(new Log()
                {
                    Message = e.Message,
                    StoryName = "MoreHolidays/LogsController/Index",
                    StackTrace = e.StackTrace
                });
                logDataIndexModel = new LogDataIndexModel();
            }
            return View(logDataIndexModel);
        }
        [HttpPost]
        public ActionResult Delete(int id)
        {
            try
            {
                LogsDataLogic.DeleteLogB(id);
            }
            catch (Exception e)
            {
                LogsLogic.InsertLog(new Log()
                {
                    Message = e.Message,
                    StoryName = "MoreHolidays/LogsController/Delete",
                    Parameters = "id =" + id.ToString(),
                    StackTrace = e.StackTrace
                });
            }
            return RedirectToAction("Index");
        }

        public ActionResult DeleteAllLogsWithStoryName(string storyName)
        {

            try
            {
                LogsDataLogic.DeleteLogsByStoryName(storyName);
            }
            catch (Exception e)
            {
                LogsLogic.InsertLog(new Log()
                {
                    Message = e.Message,
                    StoryName = "MoreHolidays/LogsController/DeleteAllLogsWithStoryName",
                    Parameters = "storyName =" + storyName,
                    StackTrace = e.StackTrace
                });
            }
            return RedirectToAction("Index");

        }
    }
}