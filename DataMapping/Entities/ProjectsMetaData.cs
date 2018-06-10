using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataMapping.Entities
{
    public class ProjectsMetaData
    {
        [DisplayName("Project Name")]
        public string Name { get; set; }
        [DisplayName("Project Arabic Name")]
        public string ArabicName { get; set; }
        [DisplayName("Project Description")]
        public string Description { get; set; }
        [DisplayName("Project Arabic Description")]
        public string ArabicDescription { get; set; }
        [DisplayName("Project Image")]
        public string ImgUrl { get; set; }
    }
    [MetadataType(typeof(ProjectsMetaData))]
    public partial class Project { }
}
