using Backend.Data;
using Backend.DTOs;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ArticlesController : ControllerBase
{
    private readonly AppDbContext _db;

    public ArticlesController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<ActionResult<PagedResponse<Article>>> GetAll(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10)
    {
        var query = _db.Articles.Where(a => a.IsPublished).OrderByDescending(a => a.PublishedAt);
        var total = await query.CountAsync();
        var data = await query.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();
        return Ok(new PagedResponse<Article> { Data = data, TotalCount = total, Page = page, PageSize = pageSize });
    }

    [HttpGet("{slug}")]
    public async Task<ActionResult<Article>> GetBySlug(string slug)
    {
        var article = await _db.Articles.FirstOrDefaultAsync(a => a.Slug == slug && a.IsPublished);
        return article is null ? NotFound() : Ok(article);
    }

    [HttpPost]
    public async Task<ActionResult<Article>> Create(Article article)
    {
        _db.Articles.Add(article);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetBySlug), new { slug = article.Slug }, article);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Article article)
    {
        if (id != article.Id) return BadRequest();
        _db.Entry(article).State = EntityState.Modified;
        await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var article = await _db.Articles.FindAsync(id);
        if (article is null) return NotFound();
        _db.Articles.Remove(article);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
