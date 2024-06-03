document.addEventListener('DOMContentLoaded', function () {
    const endpoint = 'http://localhost:3000/bigliettiAcquistati'; // Endpoint per le tratte dei bus

    const btnPaga = document.querySelector('#btnPaga');

    btnPaga.addEventListener('click', function () {
        const nomeUser = document.querySelector('#nomeUser').value.trim();
        const emailUser = document.querySelector('#emailUser').value.trim();
        const metodoPagamento = document.querySelector('input[name="metodoPagamento"]:checked').value;

        if (!nomeUser || !emailUser || !metodoPagamento) {
            alert('Si prega di compilare tutti i campi per procedere al pagamento.');
            return;
        }

        const pagamento = {
            nome: nomeUser,
            email: emailUser,
            metodoPagamento: metodoPagamento
        };

        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pagamento)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Errore nella richiesta di pagamento');
            }
            return response.json();
        })
        .then(() => {
            // Pulire i campi del form dopo il pagamento
            document.querySelector('#nomeUser').value = '';
            document.querySelector('#emailUser').value = '';
            document.querySelector('input[name="metodoPagamento"]:checked').checked = false;

            alert('Pagamento effettuato con successo!');
        })
        .catch(error => {
            console.error('Errore:', error);
            alert('Si è verificato un errore durante il pagamento. Riprova più tardi.');
        });
    });
});
