using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HeroApp.Api.Data;
using HeroApp.Api.DTOs;
using HeroApp.Api.Models;

namespace HeroApp.Api.Controllers {

    [ApiController]
    [Route("api/[controller]")]
    public class HeroisController : ControllerBase
    {
        private readonly AppDbContext _context;

        public HeroisController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IEnumerable<HeroiListaDto>>> GetAll([FromQuery] string? nome, int? poderId)
        {


            var query = _context.Herois
                .Include(h => h.HeroisSuperpoderes)
                .ThenInclude(hs => hs.Superpoder)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(nome))
            {
                var busca = nome.ToLower();

                query = query.Where(h =>
                    h.NomeHeroi.ToLower().Contains(busca) ||
                    h.Nome.ToLower().Contains(busca));
            }

            if (poderId.HasValue && poderId >= 0)
            {
                query = query.Where(h =>
                    h.HeroisSuperpoderes.Any(hs => hs.SuperpoderId == poderId));
            }

            var herois = await query.ToListAsync();

            if (herois.Count == 0)
            {
                return NotFound(new { mensagem = "Nenhum herói encontrado." });
            }

            var result = herois.Select(h => new HeroiListaDto
            {
                Id = h.Id,
                Nome = h.Nome,
                NomeHeroi = h.NomeHeroi,
                HeroiSuperpoderes = h.HeroisSuperpoderes
                    .Select(hs => hs.Superpoder!.Nome)
                    .ToList()
            });

            return Ok(result);

        }


        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<HeroiDetalheDto>> GetById(int id)
        {

            var heroi = await _context.Herois
             .Include(h => h.HeroisSuperpoderes)
             .ThenInclude(hs => hs.Superpoder)
             .FirstOrDefaultAsync(h => h.Id == id);

            if (heroi == null)
            {
                return NotFound(new { mensagem = "Herói não encontrado." });
            }

            var result = new HeroiDetalheDto
            {
                Id = heroi.Id,
                Nome = heroi.Nome,
                NomeHeroi = heroi.NomeHeroi,
                DataNascimento = heroi.DataNascimento,
                Altura = heroi.Altura,
                Peso = heroi.Peso,
                HeroiSuperpoderes = heroi.HeroisSuperpoderes
            .Select(hs => new SuperpoderDto
            {
                Id = hs.SuperpoderId,
                Superpoder = hs.Superpoder!.Nome,
                Descricao = hs.Superpoder!.Descricao
            })
    .ToList()
            };

            return Ok(result);

        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Post([FromBody] HeroiCadastroDto dto)
        {

            if (await _context.Herois.AnyAsync(h => h.NomeHeroi == dto.NomeHeroi.ToLower()))
            {
                return BadRequest(new
                {
                    mensagem = "Já existe um herói com esse nome de herói cadastrado!"
                });
            }
            ;

            var poderesExistentesCount = await _context.Superpoderes
        .Where(s => dto.HeroiSuperpoderesIds.Contains(s.Id))
        .CountAsync();

            if (poderesExistentesCount != dto.HeroiSuperpoderesIds.Count)
            {
                return BadRequest(new { mensagem = "Um ou mais IDs de superpoderes informados não existem." });
            }

            var novoHeroi = new Heroi
            {
                Nome = dto.Nome,
                NomeHeroi = dto.NomeHeroi,
                DataNascimento = dto.DataNascimento,
                Altura = dto.Altura,
                Peso = dto.Peso,

                HeroisSuperpoderes = dto.HeroiSuperpoderesIds.Select(id => new HeroiSuperpoder
                {
                    SuperpoderId = id
                }).ToList()
            };

            _context.Herois.Add(novoHeroi);
            await _context.SaveChangesAsync();

            var retorno = new
            {
                id = novoHeroi.Id,
                nomeHeroi = novoHeroi.NomeHeroi,
                mensagem = "Herói criado com sucesso!"
            };

            return CreatedAtAction(nameof(GetById), new { id = novoHeroi.Id }, retorno);


        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> Put(int id, [FromBody] HeroiCadastroDto dto)
        {

            var heroiExistente = await _context.Herois
                .Include(h => h.HeroisSuperpoderes)
                .FirstOrDefaultAsync(h => h.Id == id);

            if (heroiExistente == null)
            {
                return NotFound(new { mensagem = "Herói não encontrado." });
            }

            if (await _context.Herois.AnyAsync(h => h.NomeHeroi.ToLower() == dto.NomeHeroi.ToLower() && h.Id != id))
            {
                return BadRequest(new
                {
                    mensagem = "Já existe um herói com esse nome de herói cadastrado!"
                });
            }
            ;

            var poderesExistentesCount = await _context.Superpoderes
        .Where(s => dto.HeroiSuperpoderesIds.Contains(s.Id))
        .CountAsync();

            if (poderesExistentesCount != dto.HeroiSuperpoderesIds.Count)
            {
                return BadRequest(new { mensagem = "Um ou mais IDs de superpoderes informados não existem." });
            }

            heroiExistente.Nome = dto.Nome;
            heroiExistente.NomeHeroi = dto.NomeHeroi;
            heroiExistente.DataNascimento = dto.DataNascimento;
            heroiExistente.Altura = dto.Altura;
            heroiExistente.Peso = dto.Peso;

            heroiExistente.HeroisSuperpoderes.Clear();
            heroiExistente.HeroisSuperpoderes = dto.HeroiSuperpoderesIds.Select(pId => new HeroiSuperpoder
            {
                SuperpoderId = pId,
                HeroiId = id
            }).ToList();


            await _context.SaveChangesAsync();



            return NoContent();


        }


        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> Delete(int id)
        {
            var heroiExistente = await _context.Herois.FindAsync(id);
            if (heroiExistente == null)
            {
                return NotFound(new { mensagem = "Herói não encontrado." });
            }

            _context.Herois.Remove(heroiExistente);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}