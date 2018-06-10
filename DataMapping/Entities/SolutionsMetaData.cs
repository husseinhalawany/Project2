using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataMapping.Entities
{
    public class SolutionsMetaData
    {
        [DisplayName("Solution Name")]
        public string Name { get; set; }
        [DisplayName("Solution Overview")]
        public string Overview { get; set; }

        [DisplayName("Arabic Solution Name")]
        public string ArabicName { get; set; }

        [DisplayName("Arabic Solution Overview")]
        public string ArabicOverview { get; set; }

        [DisplayName("Solution Image")]
        public string ImgUrl { get; set; }
    }
    [MetadataType(typeof(SolutionsMetaData))]
    public partial class Solution { }
}
