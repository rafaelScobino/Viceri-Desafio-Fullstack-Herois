using HeroApp.Api.Models;

namespace HeroApp.Api.Data;

public static class DbSeeder
{
    public static void Seed(AppDbContext context)
    {
        if (!context.Superpoderes.Any())
        {
            context.Superpoderes.AddRange(
                new Superpoder { Id = 1, Nome = "Voo", Descricao = "Capacidade de voar" },
                new Superpoder { Id = 2, Nome = "Super Força", Descricao = "Força sobre-humana" },
                new Superpoder { Id = 3, Nome = "Agilidade", Descricao = "Reflexos e movimentos rápidos" },
                new Superpoder { Id = 4, Nome = "Dinheiro", Descricao = "O poder de ser rico (estilo Batman)" }
            );
            context.SaveChanges();
        }

        if (!context.Herois.Any())
        {
            var herois = new List<Heroi>
            {
                new Heroi 
                { 
                    Id = 1, 
                    Nome = "Peter Parker", 
                    NomeHeroi = "Homem-Aranha", 
                    DataNascimento = new DateTime(2001, 8, 10),
                    Altura = 1.78,
                    Peso = 75,
                    HeroisSuperpoderes = new List<HeroiSuperpoder> 
                    { 
                        new HeroiSuperpoder { SuperpoderId = 3 } 
                    }
                },
                new Heroi 
                { 
                    Id = 2, 
                    Nome = "Bruce Wayne", 
                    NomeHeroi = "Batman", 
                    DataNascimento = new DateTime(1985, 2, 19),
                    Altura = 1.88,
                    Peso = 95,
                    HeroisSuperpoderes = new List<HeroiSuperpoder> 
                    { 
                        new HeroiSuperpoder { SuperpoderId = 4 }, 
                        new HeroiSuperpoder { SuperpoderId = 2 }  
                    }
                }
            };

            context.Herois.AddRange(herois);
            context.SaveChanges();
        }
    }
}