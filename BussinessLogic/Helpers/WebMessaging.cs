using BusinessLogic.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace BussinessLogic.Helpers
{
    public class WebMessaging
    {
        public static string UploadMessageAttachment(HttpPostedFileBase file, string contentType, string FileName)
        {
            string Url = "";
            if (AmazonS3Helper.WritingAnObject(file.InputStream, contentType, FileName))
                Url = "https://s3.eu-central-1.amazonaws.com/alrajhisolutions/PMSystem/" + FileName;
            return Url;
        }
    }
}
