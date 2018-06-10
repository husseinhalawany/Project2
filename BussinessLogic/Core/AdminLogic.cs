using System.Collections.Generic;
using DataAccess.Repositories;
using DataMapping.Entities;
using DataMapping.Services;
using BussinessLogic.Helpers;
using BussinessLogic.Model;

namespace BussinessLogic.Core
{
    public class AdminLogic
    {
        public static List<UserProfile> GetAdminList(int page)
        {
            int takeCount = Config.PageItemCount();
            int skipCount = page * takeCount;
            return AdminRepositories.GetAdminList(skipCount, takeCount);
        }
        public static UserProfile GetAdminById(int id)
        {
            return AdminRepositories.GetAdminById(id);
        }
        public static UserProfile GetAdminByName(string name)
        {
            return AdminRepositories.GetAdminByName(name);
        }
        public static UpdateProfileModel GetProfileModelById(int id)
        {
            UserProfile user = AdminRepositories.GetAdminById(id);
            UpdateProfileModel Model = new UpdateProfileModel()
            {
                Name = user.Name,
                UserName=user.UserName,
                Address=user.Address,
                BirthDate=user.BirthDate,
                Email=user.Email,
                FirstName=user.FirstName,
                LastName=user.LastName,
                Phone1=user.Phone1,
                Phone2=user.Phone2,
                ProfilePictureUrl=user.ProfilePictureUrl,
                RolesId=user.RolesId,
                UserId=user.UserId
            };
            return Model;
        }
        public static void UpdateAdminById(UserProfile admin,int userId)
        {
            AdminRepositories.UpdateAdminById(admin, userId);
        }
        public static void UpdateAdmin(UpdateProfileModel Model)
        {
            UserProfile admin = new UserProfile()
            {
                Address = Model.Address,
                BirthDate = Model.BirthDate,
                Email = Model.Email,
                FirstName = Model.FirstName,
                LastName = Model.LastName,
                Name = Model.Name,
                Phone1 = Model.Phone1,
                Phone2 = Model.Phone2,
                ProfilePictureUrl = Model.ProfilePictureUrl,
                UserId = Model.UserId
            };
            AdminRepositories.UpdateAdmin(admin);
        }
        public static void DeleteAdmin(int id,bool isLocked)
        {
            AdminRepositories.DeleteAdmin(id, isLocked);
        }
        public static ChangePasswordDetails GetChangePasswordDetails(int userId)
        {
            return AdminRepositories.GetAdminPasswordDetails(userId);
        }
    }
}
