let elListaRiep = document.querySelector("#listaRiep");
let grandTotal = document.querySelector("#grandTotal");

let viaggiCarrello = [];

function recuperaViaggi() {
    let totale = 0;
    let keys = Object.keys(localStorage);
    let fetchPromises = [];

    // Recupera i dati dal localStorage
    keys.forEach(key => {
        let costo = parseInt(localStorage[key].split(" - ")[3]);
        totale += costo;
        elListaRiep.innerHTML += `<li class='list-group-item'>${localStorage[key]} € </li>`;
    });

    Promise.all(fetchPromises)
    .then(() => {
        grandTotal.innerHTML = "Totale: € " + totale;
    });
}

window.addEventListener("DOMContentLoaded", recuperaViaggi);

