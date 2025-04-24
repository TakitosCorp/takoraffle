const prizes = [
    {id: "P1", name: "Tarjeta de Regalo de $50", icon: "gift"},
    {id: "P2", name: "Auriculares Inalámbricos", icon: "headphones"},
    {id: "P3", name: "Boletos para el Cine", icon: "film"},
    {id: "P4", name: "Reloj Inteligente", icon: "watch"},
    {id: "P5", name: "Cafetera", icon: "coffee"},
    {id: "P6", name: "Parrilla Eléctrica", icon: "grill"},
    {id: "P7", name: "Tablet", icon: "tablet"},
    {id: "P8", name: "Bocina Bluetooth", icon: "speaker"},
    {id: "P9", name: "Juego de Utensilios de Cocina", icon: "utensils"},
    {id: "P10", name: "Set de Maletas de Viaje", icon: "suitcase"},
    {id: "P11", name: "Cámara Digital", icon: "camera"},
    {id: "P12", name: "Bicicleta", icon: "bicycle"},
    {id: "P13", name: "Kit de Herramientas", icon: "tools"},
    {id: "P14", name: "Lámpara LED Inteligente", icon: "lightbulb"},
    {id: "P15", name: "Suscripción de Música por 1 Año", icon: "music"},
    {id: "P16", name: "Libro Electrónico", icon: "book"},
    {id: "P17", name: "Juego de Consola", icon: "gamepad"},
    {id: "P18", name: "Vales de Supermercado", icon: "shopping-cart"},
    {id: "P19", name: "Cuadro Decorativo", icon: "image"},
    {id: "P20", name: "Auriculares con Cancelación de Ruido", icon: "headphones"},
    {id: "P21", name: "Auriculares con Cancelación de Ruido", icon: "headphones"}
];

const gridContainer = document.getElementById('raffleGrid');
const popup = document.getElementById('prizePopup');
const popupContent = document.getElementById('popupContent');
const closePopup = document.getElementById('closePopup');
const prizeText = document.getElementById('prizeText');
const cellId = document.getElementById('cellId');
const popupIcon = document.getElementById('popupIcon');
const claimButton = document.getElementById('claimButton');

prizes.forEach((prize, index) => {
    const cell = document.createElement('div');
    cell.className = 'grid-cell h-48 cursor-pointer group relative';
    cell.setAttribute('data-prize', prize.name);
    cell.setAttribute('data-cellid', prize.id);

    const innerContent = document.createElement('div');
    innerContent.className = 'relative z-10 flex flex-col items-center justify-center h-full w-full bg-white rounded-lg overflow-hidden transition-transform duration-500 group-hover:scale-95';

    const img = document.createElement('img');
    img.src = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/GENERAL-VWjrp7WjA6lM2igr4BOQGeyuZrOrme.png";
    img.alt = prize.name;
    img.className = 'w-full h-full object-cover transition-transform duration-500 group-hover:scale-110';

    const overlay = document.createElement('div');
    overlay.className = 'absolute inset-0 bg-gradient-to-t from-raffle-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4';

    const cellNumber = document.createElement('span');
    cellNumber.className = 'text-white font-bold text-xl';
    cellNumber.textContent = prize.id;

    overlay.appendChild(cellNumber);
    innerContent.appendChild(img);
    innerContent.appendChild(overlay);
    cell.appendChild(innerContent);

    gridContainer.appendChild(cell);

    cell.addEventListener('click', () => {
        prizeText.textContent = prize.name;
        popupIcon.setAttribute('data-lucide', prize.icon);
        lucide.createIcons();
        showPopup();
    });
});

function showPopup() {
    popup.style.display = 'block';
    void popup.offsetWidth;
    popup.classList.add('opacity-100');
}

function hidePopup() {
    popup.classList.remove('opacity-100');
    popupContent.classList.add('animate-pop-out');

    setTimeout(() => {
        popup.style.display = 'none';
        popupContent.classList.remove('animate-pop-out');
    }, 300);
}

closePopup.addEventListener('click', hidePopup);
popup.addEventListener('click', (e) => {
    if (e.target === popup) hidePopup();
});
claimButton.addEventListener('click', () => {
    hidePopup();
});
lucide.createIcons();