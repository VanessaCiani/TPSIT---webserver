// Importa la libreria Express che serve per creare il server web
const express = require("express");

// Importa il modulo File System per leggere e scrivere file
const fs = require("fs");

// Importa il modulo Path per gestire i percorsi delle cartelle in modo sicuro
const path = require("path");

// Crea l'applicazione server usando Express
const app = express();

// Definisce la porta su cui il server funzionerà
const PORT = 3000;

// Permette al server di leggere dati inviati in formato JSON
app.use(express.json());

// Permette di servire automaticamente file statici dalla cartella "public" 
app.use(express.static("public"));
 
// Percorso del file che contiene le domande organizzate per categorie
const domandePath = path.join(__dirname, "domande.json");

// Percorso del file che contiene le risposte possibili dell'oracolo
const rispostePath = path.join(__dirname, "risposte.json");

// Endpoint GET che restituisce tutte le categorie disponibili
app.get("/categorie", (req, res) => {

    // Legge il file delle domande e lo converte da testo JSON a oggetto JavaScript
    const domande = JSON.parse(fs.readFileSync(domandePath));

    // Invia al client solo i nomi delle categorie presenti nel file
    res.json(Object.keys(domande));
});

// Endpoint POST che genera la risposta dell'oracolo
app.post("/oracolo", (req, res) => {

    // Recupera dal messaggio ricevuto la categoria scelta dall'utente
    const categoria = req.body.categoria;

    // Legge il file che contiene tutte le possibili risposte
    const risposte = JSON.parse(fs.readFileSync(rispostePath));

    // Prende solo l'elenco di risposte relativo alla categoria scelta
    const lista = risposte[categoria];

    // Genera un numero casuale tra 0 e la lunghezza della lista
    const random = Math.floor(Math.random() * lista.length);

    // Invia al client la risposta selezionata casualmente
    res.json({
        risposta: lista[random]
    });
});

// Avvia il server e lo mette in ascolto sulla porta definita
app.listen(PORT, () => {

    // Messaggio di conferma mostrato nel terminale quando il server parte
    console.log("Server attivo su http://localhost:" + PORT);

});

