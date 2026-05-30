using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TeamController : ControllerBase
{
    private readonly AppDbContext _db;

    public TeamController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TeamMember>>> GetAll()
    {
        var members = await _db.TeamMembers
            .Where(m => m.IsActive)
            .OrderBy(m => m.DisplayOrder)
            .ToListAsync();
        return Ok(members);
    }
}
