using System;
using DataMapping.Interfaces;
using Newtonsoft.Json;
using DataMapping.Entities;

namespace DataMapping.JSONData
{
    public class LogData : IJson, IEntity, IResult
    {
        public int Id { get; set; }
        public DateTime CreateDate { get; set; }
        public string Message { get; set; }
        public string Parameters { get; set; }
        public string StackTrace { get; set; }
        public string StoryName { get; set; }
        public string ErrorMessage { get; set; }
        public bool Succeeded { get; set; }

        public IJson InitByJson(string json)
        {
            return JsonConvert.DeserializeObject<LogData>(json);
        }
        public string ToJson()
        {
            return JsonConvert.SerializeObject(this);
        }
        public IJson InitByEntity(object obj)
        {
            Log log = (Log)obj;
            CreateDate = log.CreateDate.Value;
            Id = log.Id;
            Message = log.Message;
            Parameters = log.Parameters;
            StackTrace = log.StackTrace;
            StoryName = log.StoryName;
            Succeeded = true;
            return this;
        }
        public object ToEntity()
        {
            return new Log()
            {
                Id = Id,
                Message = Message,
                Parameters = Parameters,
                StackTrace = StackTrace,
                StoryName = StoryName
            };
        }
    }
}