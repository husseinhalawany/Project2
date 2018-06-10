namespace DataMapping.Interfaces
{
    public interface IMetadata
    {
        string MetaTitle { get; set; }
        string Description { get; set; }
        string ImgUrlMetadata { get; set; }
        string WebsiteAction { get; set; }
        string PriceParameter { get; set; }
        string CurrencyParameter { get; set; }
    }
}
