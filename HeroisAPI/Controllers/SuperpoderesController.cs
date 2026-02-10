using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HeroApp.Api.Data;
using HeroApp.Api.DTOs;
using HeroApp.Api.Models;

namespace HeroApp.Api.Controllers{

	[ApiController]
	[Route("api/[controller]")]
	public class SuperpoderesController : ControllerBase
	{
		private readonly AppDbContext _context;

		public SuperpoderesController(AppDbContext context)
		{
			_context = context;
		}

		[HttpGet]
		[ProducesResponseType(StatusCodes.Status200OK)]
		public async Task<ActionResult<IEnumerable<SuperpoderDto>>> Get()
		{

			var poderes = await _context.Superpoderes
				.Select(p => new SuperpoderDto
				{
					Id = p.Id,
					Nome = p.Nome,
					Descricao = p.Descricao
				})
				.ToListAsync();

			return Ok(poderes);
		}
	}
}