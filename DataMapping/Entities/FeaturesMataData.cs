using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace DataMapping.Entities
{
    public class FeaturesMataData
    {
        [DisplayName("Feature Name")]
        public string Name { get; set; }
        [DisplayName("Feature Arabic Name")]
        public string ArabicName { get; set; }
        [DisplayName("Feature Description")]
        public string Description { get; set; }
        [DisplayName("Feature Arabic Description")]
        public string ArabicDescription { get; set; }

    }

    [MetadataType(typeof(FeaturesMataData))]
    public partial class Feature { }
}
