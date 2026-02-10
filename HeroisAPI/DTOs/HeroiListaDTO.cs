namespace HeroApp.Api.DTOs
{
    public class HeroiListaDto
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string NomeHeroi { get; set; } = string.Empty;
        
        public List<string> Superpoderes { get; set; } = new();
    }
}