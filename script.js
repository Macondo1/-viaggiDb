let elViaggi = document.querySelector("#elViaggi");

function recuperaViaggi() {
    const urlViaggi = "http://localhost:3000/viaggi";

    fetch(urlViaggi)
        .then(response => response.json())
        .then(data => {
            let viaggi = data;
            console.log(viaggi);

            viaggi.forEach(viaggio => {
                if (viaggio.disponibilita) {
                    elViaggi.appendChild(creaCardViaggio(viaggio));
                } 
            });
        })
        .catch(error => {
            console.error('Si è verificato un errore durante il recupero dei viaggi:', error);
        });
}

window.addEventListener("DOMContentLoaded", recuperaViaggi);

function creaCardViaggio(viaggio) {
    let card = document.createElement("div");
    card.setAttribute("class", "card col-3 p-2 ");

    let img = document.createElement("img");
    img.setAttribute("class", "card-img-top");
    img.setAttribute("alt", "Nome del viaggio: " + viaggio.tratta);
    img.setAttribute("src", viaggio.locandina); 

    let divCardBody = document.createElement("div");
    divCardBody.setAttribute("class", "card-body");

    card.appendChild(img);
    card.appendChild(divCardBody);

    
    divCardBody.innerHTML += `<h4 class="card-title"> ${viaggio.tratta} </h4>`;
    divCardBody.innerHTML += `<h5 class="card-title"> ${viaggio.data} </h5>`;
    divCardBody.innerHTML += `<p class="card-text"> Costo: ${viaggio.costo} € </p>`;
    divCardBody.innerHTML += `<p class="card-text"> Durata del viaggio: ${viaggio.durata} </p>`;

    let dropDown = document.createElement("select");

    viaggio.tipologia.forEach(tipo => {
        let option = document.createElement("option");
        option.text = tipo.nome + " - " + tipo.costo + " €";
        option.value = tipo.nome; 
        dropDown.appendChild(option);
    });

    divCardBody.appendChild(dropDown);

    let buttonAcquista = document.createElement("button");
    buttonAcquista.setAttribute("class", "btn btn-primary mt-3");
    buttonAcquista.textContent = "Acquista";

    buttonAcquista.addEventListener("click", function () {
        let scelta = dropDown.value;
        let costoTipologia = viaggio.tipologia.find(tipo => tipo.nome === scelta).costo;
        let costoTotale = viaggio.costo + costoTipologia;
        localStorage.setItem(viaggio.id, viaggio.tratta + " - " + scelta + " - " + costoTotale );
        window.location.href = "carrello.html";
    });
    

    divCardBody.appendChild(buttonAcquista);

    return card;
}

