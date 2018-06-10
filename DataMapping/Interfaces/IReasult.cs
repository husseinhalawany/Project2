namespace DataMapping.Interfaces
{
    public interface IResult
    {
        bool Succeeded { get; set; }
        string ErrorMessage { get; set; }
    }
}
