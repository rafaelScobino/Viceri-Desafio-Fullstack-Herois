namespace HeroApp.Api.Models
{
    public class Superpoder
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Descricao { get; set; } = string.Empty; 

        public List<HeroiSuperpoder> HeroisSuperpoderes { get; set; } = new();
    }
}