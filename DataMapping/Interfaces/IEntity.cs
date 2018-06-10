namespace DataMapping.Interfaces
{
    public interface IEntity
    {
        IJson InitByEntity(object obj);
        object ToEntity();
    }
}
