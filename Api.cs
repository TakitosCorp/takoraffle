using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Antiforgery;

namespace takoraffle;

public class Api
{
    public static void MapRoutes(WebApplication app)
    {
        app.UseAntiforgery();
        app.MapGet("/prizes", async (RaffleDbContext db) =>
        {
            var prizes = await db.Prizes.ToListAsync();
            return Results.Json(prizes);
        });

        app.MapPost("/prizes/{id}/claim", async (int id, RaffleDbContext db) =>
        {
            var prize = await db.Prizes.FindAsync(id);
            if (prize == null) return Results.NotFound();
            prize.Claimed = true;
            await db.SaveChangesAsync();
            return Results.Ok(prize);
        });

        app.MapPost("/prizes/{id}/unclaim", async (int id, RaffleDbContext db) =>
        {
            var prize = await db.Prizes.FindAsync(id);
            if (prize == null) return Results.NotFound();
            prize.Claimed = false;
            await db.SaveChangesAsync();
            return Results.Ok(prize);
        });

        app.MapPost("/prizes/upload", async (IFormFile file, RaffleDbContext db) =>
        {
            using var reader = new StreamReader(file.OpenReadStream());
            var prizes = new List<Prize>();

            db.Prizes.RemoveRange(db.Prizes);
            await db.SaveChangesAsync();

            await db.Database.ExecuteSqlRawAsync("DELETE FROM sqlite_sequence WHERE name='Prizes';");

            while (!reader.EndOfStream)
            {
                var line = await reader.ReadLineAsync();
                if (line == null || line.StartsWith("name,icon,claimed")) continue;
                var parts = line.Split(',');
                prizes.Add(new Prize
                {
                    Name = parts[0],
                    Icon = parts[1],
                    Claimed = bool.Parse(parts[2])
                });
            }

            db.Prizes.AddRange(prizes);
            await db.SaveChangesAsync();
            return Results.Ok(prizes);
        });
    }
}