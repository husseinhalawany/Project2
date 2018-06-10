using System.ComponentModel.DataAnnotations;

namespace DataMapping.Services
{
    public class ChangePasswordDetails
    {
        public string UserName { get; set; }
        public string Name { get; set; }

        [Required(ErrorMessage = " you have to Enter the Old Paswword")]
        public string OldPassword { get; set; }

        [Required(ErrorMessage = "you have to Enter the New password")]
        public string NewPassword { get; set; }
        [Required(ErrorMessage = "Please confirm password")]
        [Compare("NewPassword", ErrorMessage = "Passwords must match")]
        [Display(Name = "Confirm Password")]
        public string ConfirmPassWord { get; set; }
    }
}
