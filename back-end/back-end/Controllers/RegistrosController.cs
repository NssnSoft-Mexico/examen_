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
            if (!Regex.IsMatch(registros.correo, @"^[^@\s]+@[^@\s]+\.[^@\s]+$"))
            {
                return BadRequest(new { mensaje = $"Hay un problema en el registro capturado: Correo inválido → {registros.correo}" });
            }

            if (!Regex.IsMatch(registros.telefono, @"^\d{16}$"))
            {
                return BadRequest(new { mensaje = $"Hay un problema en el registro capturado: Teléfono inválido → {registros.telefono}" });
            }

            if (!Regex.IsMatch(registros.compania, @"^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$"))
            {
                return BadRequest(new { mensaje = $"Hay un problema en el registro capturado: Persona inválida → {registros.compania}" });
            }

            if (!Regex.IsMatch(registros.persona, @"^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$"))
            {
                return BadRequest(new { mensaje = $"Hay un problema en el registro capturado: Persona2 inválida → {registros.persona}" });
            }
            _context.Registros.Add(registros);
            await _context.SaveChangesAsync();
            return Ok(registros);
        }
    }
}
