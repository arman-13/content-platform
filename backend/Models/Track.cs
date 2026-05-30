namespace Backend.Models;

public class Track
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string AlbumTitle { get; set; } = string.Empty;
    public string Artist { get; set; } = string.Empty;
    public string Genre { get; set; } = string.Empty;
    public string Duration { get; set; } = string.Empty;
    public string CoverImageUrl { get; set; } = string.Empty;
    public string AudioUrl { get; set; } = string.Empty;
    public DateTime PublishedAt { get; set; }
    public bool IsPublished { get; set; }
}
