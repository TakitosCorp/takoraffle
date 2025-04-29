namespace takoraffle;

public class Api
{
    public static void MapRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/prices", () =>
        {
            var prizes = new[]
            {
                new { id = "C1", name = "Tarjeta de Regalo de $50", icon = "gift" },
                new { id = "C1", name = "Auriculares Inalámbricos", icon = "headphones" },
                new { id = "C3", name = "Boletos para el Cine", icon = "film" },
                new { id = "C4", name = "Reloj Inteligente", icon = "watch" },
                new { id = "C5", name = "Cafetera", icon = "coffee" },
                new { id = "C6", name = "Parrilla Eléctrica", icon = "grill" },
                new { id = "C7", name = "Tablet", icon = "tablet" },
                new { id = "C8", name = "Bocina Bluetooth", icon = "speaker" },
                new { id = "C9", name = "Juego de Utensilios de Cocina", icon = "utensils" },
                new { id = "C10", name = "Set de Maletas de Viaje", icon = "suitcase" },
                new { id = "C11", name = "Cámara Digital", icon = "camera" },
                new { id = "C12", name = "Bicicleta", icon = "bicycle" },
                new { id = "C13", name = "Kit de Herramientas", icon = "tools" },
                new { id = "C14", name = "Lámpara LED Inteligente", icon = "lightbulb" },
                new { id = "C15", name = "Suscripción de Música por 1 Año", icon = "music" },
                new { id = "C16", name = "Libro Electrónico", icon = "book" },
                new { id = "C17", name = "Juego de Consola", icon = "gamepad" },
                new { id = "C18", name = "Vales de Supermercado", icon = "shopping-cart" },
                new { id = "C19", name = "Cuadro Decorativo", icon = "image" },
                new { id = "C20", name = "Auriculares con Cancelación de Ruido", icon = "headphones" },
                new { id = "C21", name = "Auriculares con Cancelación de Ruido", icon = "headphones" }
            };
            return Results.Json(prizes);
        });
    }
}
