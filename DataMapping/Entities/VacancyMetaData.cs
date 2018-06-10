using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataMapping.Entities
{
    public class VacancyMetaData
    {
        [DisplayName("Vacancy Name")]
        public string Name { get; set; }


        [DisplayName("Arabic Vacancy Name")]
        public string ArabicName { get; set; }
    }

    [MetadataType(typeof(VacancyMetaData))]
    public partial class Vacancy { }
}
