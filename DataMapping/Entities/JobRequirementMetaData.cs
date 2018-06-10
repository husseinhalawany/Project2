using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataMapping.Entities
{
    public class JobRequirementMetaData
    {
        [DisplayName("Job Requirement Details")]
        public string Details { get; set; }
        [DisplayName("Job Requirement Arabic Details")]
        public string ArabicDetails { get; set; }
    }
    [MetadataType(typeof(JobRequirementMetaData))]
    public partial class JobRequirement { }
}
