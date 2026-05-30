namespace Backend.Models;

public class Video
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string ThumbnailUrl { get; set; } = string.Empty;
    public string VideoUrl { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public DateTime PublishedAt { get; set; }
    public bool IsPublished { get; set; }
}
