document.addEventListener("DOMContentLoaded", async () => {
    const gridContainer = document.getElementById("raffleGrid");
    const popup = document.getElementById("prizePopup");
    const popupContent = document.getElementById("popupContent");
    const closePopup = document.getElementById("closePopup");
    const prizeText = document.getElementById("prizeText");
    const popupIcon = document.getElementById("popupIcon");
    const claimButton = document.getElementById("claimButton");

    function showPopup() {
        popup.style.display = "block";
        void popup.offsetWidth; // Trigger reflow para animaciones
        popup.classList.add("opacity-100");
    }

    function hidePopup() {
        popup.classList.remove("opacity-100");
        popupContent.classList.add("animate-pop-out");
        setTimeout(() => {
            popup.style.display = "none";
            popupContent.classList.remove("animate-pop-out");
        }, 300);
    }

    closePopup.addEventListener("click", hidePopup);
    popup.addEventListener("click", (e) => {
        if (e.target === popup) hidePopup();
    });

    claimButton.addEventListener("click", () => {
        hidePopup();
    });

    try {
        const response = await fetch("/prizes");
        if (!response.ok) throw new Error("Error al cargar los premios.");
        const prizes = await response.json();

        prizes.forEach((prize) => {
            const cell = document.createElement("div");
            cell.className = "grid-cell h-48 cursor-pointer group relative";
            cell.setAttribute("data-prize", prize.name);
            cell.setAttribute("data-cellid", prize.id);

            const innerContent = document.createElement("div");
            innerContent.className =
                "relative z-10 flex flex-col items-center justify-center h-full w-full bg-white rounded-lg overflow-hidden transition-transform duration-500 group-hover:scale-95";

            const img = document.createElement("img");
            img.src =
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/GENERAL-VWjrp7WjA6lM2igr4BOQGeyuZrOrme.png";
            img.alt = prize.name;
            img.className =
                "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110";

            if (prize.claimed) {
                img.style.filter = "grayscale(50%)";
                img.style.opacity = "0.5";
            }
            
            innerContent.appendChild(img);
            cell.appendChild(innerContent);
            gridContainer.appendChild(cell);

            cell.addEventListener("click", () => {
                prizeText.textContent = prize.name;

                if (prize.claimed) {
                    prizeText.textContent += " (Reclamado)";
                    claimButton.style.display = "none";
                } else {
                    claimButton.style.display = "block";
                }

                popupIcon.innerHTML = ""; 

                const newIcon = document.createElement("i");
                newIcon.id = "popupIcon"; 
                newIcon.className = "text-black text-3xl";
                newIcon.setAttribute("data-lucide", prize.icon);

                popupIcon.appendChild(newIcon);
                lucide.createIcons();
                showPopup();
            });
        });
    } catch (error) {
        console.error("Error al cargar los premios:", error);
    }
});
