using back_end.Data;
using back_end.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace back_end.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RegistrosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public RegistrosController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Registros>>> Get() 
        {
            return await _context.Registros.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Registros>> Post(Registros registros) 
        {
            _context.Registros.Add(registros);
            await _context.SaveChangesAsync();
            return Ok(registros);
        }
    }
}
