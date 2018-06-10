using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataMapping.Entities;

namespace DataAccess.Repositories
{
    public class ClientRepositories
    {
        public static List<Client> GetClientsList(int skipCount, int takeCount)
        {
            using (MoreHolidaysDBEntities db = new MoreHolidaysDBEntities())
            {
                var q = db.Clients.Where(p => p.IsDeleted == false);
                return q.OrderBy(m => m.Id).Skip(skipCount).Take(takeCount).ToList();
            }
        }

        public static Client GetClientById(int id)
        {
            using (MoreHolidaysDBEntities db = new MoreHolidaysDBEntities())
            {
                return db.Clients.FirstOrDefault(a => a.Id == id && a.IsDeleted == false);
            }
        }

        public static void InsertNewClient(Client client)
        {
            using (MoreHolidaysDBEntities db = new MoreHolidaysDBEntities())
            {
                client.CreateDate = DateTime.Now;
                db.Clients.Add(client);
                db.SaveChanges();
            }
        }

        public static void UpdateClient(Client client)
        {
            using (MoreHolidaysDBEntities db = new MoreHolidaysDBEntities())
            {
                var q = db.Clients.FirstOrDefault(a => a.Id == client.Id);
                if (q != null)
                {
                    q.Name = client.Name;
                    q.ArabicName = client.ArabicName;
                    q.ImgUrl = client.ImgUrl;
                    q.WebsiteUrl = client.WebsiteUrl;
                    q.WorkField = client.WorkField;
                    q.ArabicWorkField = client.ArabicWorkField;
                    q.LastUpdateTime = DateTime.Now;
                    db.SaveChanges();
                }
            }
        }

        public static void DeleteClient(int id)
        {
            using (MoreHolidaysDBEntities db = new MoreHolidaysDBEntities())
            {
                var q = db.Clients.FirstOrDefault(a => a.Id == id);
                if (q != null)
                {
                    q.IsDeleted = true;
                    db.SaveChanges();
                }
            }
        }
    }
}
