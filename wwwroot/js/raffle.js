const gridContainer = document.getElementById('raffleGrid');
const popup = document.getElementById('prizePopup');
const popupContent = document.getElementById('popupContent');
const closePopup = document.getElementById('closePopup');
const prizeText = document.getElementById('prizeText');
const popupIcon = document.getElementById('popupIcon');
const claimButton = document.getElementById('claimButton');

document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch('/prices');
    const prizes = await response.json();

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
