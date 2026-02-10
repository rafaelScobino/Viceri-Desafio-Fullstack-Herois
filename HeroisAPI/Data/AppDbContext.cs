using Microsoft.EntityFrameworkCore;
using HeroApp.Api.Models;

namespace HeroApp.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Heroi> Herois { get; set; } 
        public DbSet<Superpoder> Superpoderes { get; set; }
        public DbSet<HeroiSuperpoder> HeroisSuperpoderes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

         
            modelBuilder.Entity<HeroiSuperpoder>()
                .HasKey(hs => new { hs.HeroiId, hs.SuperpoderId });

            
            modelBuilder.Entity<HeroiSuperpoder>()
                .HasOne(hs => hs.Heroi)
                .WithMany(h => h.HeroisSuperpoderes)
                .HasForeignKey(hs => hs.HeroiId);

         
            modelBuilder.Entity<HeroiSuperpoder>()
                .HasOne(hs => hs.Superpoder)
                .WithMany(s => s.HeroisSuperpoderes)
                .HasForeignKey(hs => hs.SuperpoderId);

            
            modelBuilder.Entity<Heroi>()
                .HasIndex(h => h.NomeHeroi)
                .IsUnique();
        }
    }
}