using Microsoft.EntityFrameworkCore;
using takoraffle;

var builder = WebApplication.CreateBuilder(args);

// Configuración de servicios
builder.Services.AddRazorPages();
builder.Services.AddDbContext<RaffleDbContext>(options =>
    options.UseSqlite("Data Source=raffle.db"));

// Construcción de la aplicación
var app = builder.Build();

// Configuración del entorno
if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}

// Middlewares
app.UseHttpsRedirection();
app.UseRouting();
app.UseAuthorization();

// Mapear rutas
app.MapStaticAssets();
app.MapRazorPages()
    .WithStaticAssets();

// Rutas de la API
Api.MapRoutes(app);

// Inicializar la base de datos
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<RaffleDbContext>();
    db.Database.EnsureCreated();
}

app.Run();
