using takoraffle;

var builder = WebApplication.CreateBuilder(args);

// Configuración de servicios
builder.Services.AddRazorPages();

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

app.Run();
