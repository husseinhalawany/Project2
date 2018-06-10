using DataMapping.Interfaces;
using DataMapping.JSONData;

namespace BusinessLogic.Models
{
    public class LogDataIndexModel : IResult
    {
        public LogData LogData { get; set; }
        public int LogCount { get; set; }
        public int CountStoryLog { get; set; }
        public string ErrorMessage { get; set; }
        public bool Succeeded { get; set; }
    }
}
