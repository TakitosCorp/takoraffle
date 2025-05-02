async function loadPrizesTable() {
    const response = await fetch('/prizes');
    const prizes = await response.json();
    const prizesTable = document.getElementById('prizesTable');
    prizesTable.innerHTML = '';
    prizes.forEach(prize => {
        const row = document.createElement('tr');
        row.innerHTML = `
                <td class="px-4 py-2 border border-raffle-light/30">${prize.id}</td>
                <td class="px-4 py-2 border border-raffle-light/30">${prize.name}</td>
                <td class="px-4 py-2 border border-raffle-light/30">
                    ${
            prize.claimed
                ? `<button class="bg-red-500 text-white px-2 py-1 rounded" onclick="unclaimPrize(${prize.id}, '${prize.name}')">Unclaim</button>`
                : `<button class="bg-green-500 text-white px-2 py-1 rounded" onclick="claimPrize(${prize.id}, '${prize.name}')">Claim</button>`
        }
                </td>
            `;
        prizesTable.appendChild(row);
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    await loadPrizesTable();
    const csvUpload = document.getElementById('csvUpload');

    // Subir CSV
    csvUpload.addEventListener('change', async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        const token = document.querySelector('input[name="__RequestVerificationToken"]').value;

        const uploadResponse = await fetch('/prizes/upload', {
            method: 'POST',
            body: formData,
            headers: {
                'RequestVerificationToken': token
            }
        });

        if (uploadResponse.ok) {
            const result = await uploadResponse.json();
            Swal.fire({
                title: '¡Éxito!',
                html: `CSV subido correctamente.`,
                icon: 'success',
                confirmButtonText: 'Aceptar',
                customClass: {
                    confirmButton: 'bg-blue-500 text-white px-4 py-2 rounded'
                }
            });
            await loadPrizesTable();
        } else {
            const errorText = await uploadResponse.text();
            Swal.fire({
                title: 'Error',
                html: `Error al subir el CSV.<br/>${errorText}`,
                icon: 'error',
                confirmButtonText: 'Aceptar',
                customClass: {
                    confirmButton: 'bg-red-500 text-white px-4 py-2 rounded'
                }
            });
        }
    });

    window.claimPrize = async (id, name) => {
        const response = await fetch(`/prizes/${id}/claim`, {method: 'POST'});
        if (response.ok) {
            Swal.fire({
                title: '¡Premio reclamado!',
                html: `El premio <b>${name}</b> (ID: ${id}) ha sido marcado como <b>claim</b>.`,
                icon: 'success',
                confirmButtonText: 'Aceptar',
                customClass: {
                    confirmButton: 'bg-blue-500 text-white px-4 py-2 rounded'
                }
            });
            await loadPrizesTable();
        } else {
            const errorText = await response.text();
            Swal.fire({
                title: 'Error',
                html: `No se pudo marcar el premio <b>${name}</b> (ID: ${id}) como claim.<br/>${errorText}`,
                icon: 'error',
                confirmButtonText: 'Aceptar',
                customClass: {
                    confirmButton: 'bg-red-500 text-white px-4 py-2 rounded'
                }
            });
        }
    };

    window.unclaimPrize = async (id, name) => {
        const response = await fetch(`/prizes/${id}/unclaim`, {method: 'POST'});
        if (response.ok) {
            Swal.fire({
                title: '¡Premio liberado!',
                html: `El premio <b>${name}</b> (ID: ${id}) ha sido marcado como <b>unclaim</b>.`,
                icon: 'success',
                confirmButtonText: 'Aceptar',
                customClass: {
                    confirmButton: 'bg-blue-500 text-white px-4 py-2 rounded'
                }
            });
            await loadPrizesTable();
        } else {
            const errorText = await response.text();
            Swal.fire({
                title: 'Error',
                html: `No se pudo marcar el premio <b>${name}</b> (ID: ${id}) como unclaim.<br/>${errorText}`,
                icon: 'error',
                confirmButtonText: 'Aceptar',
                customClass: {
                    confirmButton: 'bg-red-500 text-white px-4 py-2 rounded'
                }
            });
        }
    };
});
