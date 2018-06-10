using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataMapping.Entities
{
    public class UserProfileMetaData
    {
        [DisplayName ( "Profile Picture")]
        public string ProfilePictureUrl { get; set; }

        [DisplayName ("First Name")]
        public string FirstName { get; set; }

        [DisplayName ("Last Name")]
        public string LastName { get; set; }
    }
    [MetadataType(typeof(UserProfileMetaData))]
    public partial class UserProfile { }
}
