using System.ComponentModel.DataAnnotations;

namespace HeroApp.Api.DTOs
{
    public class HeroiCadastroDto
    {
        [Required(ErrorMessage = "O nome real é obrigatório")]
        public string Nome { get; set; } = string.Empty;

        [Required(ErrorMessage = "O nome de herói é obrigatório")]
        public string NomeHeroi { get; set; } = string.Empty;

        [Required]
        public DateTime DataNascimento { get; set; }

        [Required]
        public double Altura { get; set; }

        [Required]
        public double Peso { get; set; }

        [Required]
        [MinLength(1, ErrorMessage = "Selecione pelo menos um superpoder")]
        public List<int> HeroiSuperpoderesIds { get; set; } = new();
    }

}

