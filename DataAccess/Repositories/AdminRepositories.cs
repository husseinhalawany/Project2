using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataMapping.Enums;
using DataMapping.Entities;
using DataMapping.Services;

namespace DataAccess.Repositories
{
    public class AdminRepositories
    {
        public static List<UserProfile> GetAdminList(int skipCount, int takeCount)
        {
            int RoleId = (int)UserRoles.Admin;
            using (MoreHolidaysDBEntities db = new MoreHolidaysDBEntities())
            {
                var q = db.UserProfiles.Where(p=>p.RolesId == RoleId).ToList();
                return q.Skip(skipCount).Take(takeCount).ToList();
            }
        }
        public static UserProfile GetAdminById(int id)
        {
            using (MoreHolidaysDBEntities db = new MoreHolidaysDBEntities())
            {
                return db.UserProfiles.FirstOrDefault(a => a.UserId == id && a.LockedUser == false);
            }
        }

        public static UserProfile GetAdminByName(String name)
        {
            using (MoreHolidaysDBEntities db = new MoreHolidaysDBEntities())
            {
                UserProfile user = new UserProfile();
                user=db.UserProfiles.FirstOrDefault(a => a.UserName == name && a.LockedUser == false);
                return user;
            }
        }
        public static void InsertAdminInRole(int AdminId,int RoleId)
        {
            using (MoreHolidaysDBEntities db = new MoreHolidaysDBEntities())
            {
                webpages_UsersInRoles UserInRole = new webpages_UsersInRoles()
                { UserId = AdminId, RoleId = RoleId };
                db.webpages_UsersInRoles.Add(UserInRole);
                db.SaveChanges();
            }
        }

        public static void UpdateAdminById(UserProfile admin, int UserId)
        {
            using (MoreHolidaysDBEntities db = new MoreHolidaysDBEntities())
            {
                var q = db.UserProfiles.FirstOrDefault(a => a.UserId == UserId);
                if (q != null)
                {
                    q.Address = admin.Address;
                    q.BirthDate = admin.BirthDate;
                    q.Email = admin.Email;
                    q.FirstName = admin.FirstName;
                    q.LastName = admin.LastName;
                    q.Name = admin.Name;
                    q.Phone1 = admin.Phone1;
                    q.Phone2 = admin.Phone2;
                    q.ProfilePictureUrl = admin.ProfilePictureUrl;
                    q.Status = admin.Status;
                    q.UserName = admin.UserName;
                    q.webpages_Roles = admin.webpages_Roles;
                    q.RolesId = (int)UserRoles.Admin;
                    db.SaveChanges();
                    AdminRepositories.InsertAdminInRole(q.UserId,(int)q.RolesId);
                }
            }
        }

        public static void UpdateAdmin(UserProfile admin)
        {
            using (MoreHolidaysDBEntities db = new MoreHolidaysDBEntities())
            {
                var q = db.UserProfiles.FirstOrDefault(a => a.UserId == admin.UserId);
                if (q != null)
                {
                    q.Address = admin.Address;
                    q.BirthDate = admin.BirthDate;
                    q.Email = admin.Email;
                    q.FirstName = admin.FirstName;
                    q.LastName = admin.LastName;
                    q.Name = admin.Name;
                    q.Phone1 = admin.Phone1;
                    q.Phone2 = admin.Phone2;
                    q.ProfilePictureUrl = admin.ProfilePictureUrl;
                    q.RolesId = (int)UserRoles.Admin;
                    db.SaveChanges();
                }
            }
        }

        public static void DeleteAdmin(int id,bool isLocked)
        {
            using (MoreHolidaysDBEntities db = new MoreHolidaysDBEntities())
            {
                var q = db.UserProfiles.FirstOrDefault(a => a.UserId == id);
                if (isLocked)
                {
                    q.LockedUser = false;
                }
                else
                {
                    q.LockedUser = true;
                }
                db.SaveChanges();
            }
        }

        public static ChangePasswordDetails GetAdminPasswordDetails(int userId)
        {
            using (MoreHolidaysDBEntities db = new MoreHolidaysDBEntities())
            {
                var q = (from user in db.UserProfiles
                            .Where(a => a.UserId == userId && a.LockedUser == false)
                            
                         select new ChangePasswordDetails()
                         {
                             UserName = user.UserName,
                             Name = user.FirstName + " " + user.LastName,
                         })
                        .FirstOrDefault();
                return q;
            }
        }


    }
}
