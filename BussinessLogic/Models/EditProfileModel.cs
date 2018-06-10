using DataMapping.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLogic.Models
{
    public class EditProfileModel
    {
        public int UserId { get; set; }
        public string Email { get; set; }
        public System.DateTime BirthDate { get; set; }
        public string Phone1 { get; set; }
        public string Phone2 { get; set; }
        public string Address { get; set; }
        public bool LockedUser { get; set; }
        public Nullable<bool> Status { get; set; }
        public string ProfilePictureUrl { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Name { get; set; }
        public Nullable<int> RolesId { get; set; }

        public virtual webpages_Roles webpages_Roles { get; set; }
    }
}
