namespace HeroApp.Api.Models
{
    public class Heroi
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string NomeHeroi { get; set; } = string.Empty;
        public DateTime DataNascimento { get; set; }
        public double Altura { get; set; }
        public double Peso { get; set; }

        public List<HeroiSuperpoder> HeroisSuperpoderes { get; set; } = new();
    }


}
