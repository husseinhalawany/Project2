using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataMapping.Entities
{
    public class ClientMetaData
    {
        [DisplayName("Client Name")]
        public string Name { get; set; }

        [DisplayName("Arabic Client Name")]
        public string ArabicName { get; set; }

        [DisplayName("Website")]
        public string WebsiteUrl { get; set; }
        [DisplayName("Work Field")]
        public string WorkField { get; set; }

        [DisplayName("Arabic Work Field")]
        public string ArabicWorkField { get; set; }
    }
    [MetadataType(typeof(ClientMetaData))]
    public partial class Client { }
}
