using Backend.Data;
using Backend.DTOs;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class VideosController : ControllerBase
{
    private readonly AppDbContext _db;

    public VideosController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<ActionResult<PagedResponse<Video>>> GetAll(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10)
    {
        var query = _db.Videos.Where(v => v.IsPublished).OrderByDescending(v => v.PublishedAt);
        var total = await query.CountAsync();
        var data = await query.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();
        return Ok(new PagedResponse<Video> { Data = data, TotalCount = total, Page = page, PageSize = pageSize });
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Video>> GetById(int id)
    {
        var video = await _db.Videos.FirstOrDefaultAsync(v => v.Id == id && v.IsPublished);
        return video is null ? NotFound() : Ok(video);
    }

    [HttpPost]
    public async Task<ActionResult<Video>> Create(Video video)
    {
        _db.Videos.Add(video);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = video.Id }, video);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Video video)
    {
        if (id != video.Id) return BadRequest();
        _db.Entry(video).State = EntityState.Modified;
        await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var video = await _db.Videos.FindAsync(id);
        if (video is null) return NotFound();
        _db.Videos.Remove(video);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
