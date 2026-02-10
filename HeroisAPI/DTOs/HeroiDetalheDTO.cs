

namespace HeroApp.Api.DTOs
{
    public class HeroiDetalheDto
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string NomeHeroi { get; set; } = string.Empty;
        public DateTime DataNascimento { get; set; }
        public double Altura { get; set; }
        public double Peso { get; set; }

        public List<SuperpoderDto> Superpoderes { get; set; } = new();
    }
}
  