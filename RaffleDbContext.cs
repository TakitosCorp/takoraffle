using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace takoraffle;

public class RaffleDbContext(DbContextOptions<RaffleDbContext> options) : DbContext(options)
{
    public DbSet<Prize> Prizes { get; set; }
}

public class Prize
{
    public int Id { get; set; }
    [MaxLength(200)] public required string Name { get; set; }
    [MaxLength(200)] public required string Icon { get; set; }
    public required bool Claimed { get; set; }
}