using Backend.Data;
using Backend.DTOs;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TracksController : ControllerBase
{
    private readonly AppDbContext _db;

    public TracksController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<ActionResult<PagedResponse<Track>>> GetAll(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10)
    {
        var query = _db.Tracks.Where(t => t.IsPublished).OrderByDescending(t => t.PublishedAt);
        var total = await query.CountAsync();
        var data = await query.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();
        return Ok(new PagedResponse<Track> { Data = data, TotalCount = total, Page = page, PageSize = pageSize });
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Track>> GetById(int id)
    {
        var track = await _db.Tracks.FirstOrDefaultAsync(t => t.Id == id && t.IsPublished);
        return track is null ? NotFound() : Ok(track);
    }

    [HttpPost]
    public async Task<ActionResult<Track>> Create(Track track)
    {
        _db.Tracks.Add(track);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = track.Id }, track);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Track track)
    {
        if (id != track.Id) return BadRequest();
        _db.Entry(track).State = EntityState.Modified;
        await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var track = await _db.Tracks.FindAsync(id);
        if (track is null) return NotFound();
        _db.Tracks.Remove(track);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
