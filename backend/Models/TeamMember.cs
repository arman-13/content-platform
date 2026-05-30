namespace Backend.Models;

public class TeamMember
{
    public int Id { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public string Bio { get; set; } = string.Empty;
    public string AvatarUrl { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Phone { get; set; }
    public string? GitHub { get; set; }
    public string? LinkedIn { get; set; }
    public int DisplayOrder { get; set; }
    public bool IsActive { get; set; }
}
