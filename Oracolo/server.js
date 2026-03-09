const express = require("express"); // Carica uno strumento per creare siti web facilmente
const fs = require("fs");           // Carica lo strumento per leggere i file (come leggere un libro)
const path = require("path");       // Strumento per gestire i percorsi delle cartelle

const app = express();
const PORT = 3000; // Il "canale" su cui il server ascolta (come una stazione radio)

app.use(express.json()); // Dice al server di capire i messaggi scritti in formato testo (JSON)
app.use(express.static("public")); // Mostra automaticamente i file (immagini, stili) che sono nella cartella "public"
 
// Percorsi per trovare i nostri "libri" di domande e risposte
const domandePath = path.join(__dirname, "domande.json");
const rispostePath = path.join(__dirname, "risposte.json");

// Quando il sito chiede "quali categorie ci sono?", il server risponde leggendo i titoli nel file domande.json
app.get("/categorie", (req, res) => {
    const domande = JSON.parse(fs.readFileSync(domandePath)); // Legge il file delle domande
    res.json(Object.keys(domande)); // Invia solo i nomi delle categorie (Amore, Fortuna, ecc.)
});

// Quando l'utente sceglie una categoria, l'oracolo decide la risposta
app.post("/oracolo", (req, res) => {
    const categoria = req.body.categoria; // Prende la categoria scelta dall'utente (es. "Amore")

    const risposte = JSON.parse(fs.readFileSync(rispostePath)); // Legge tutte le possibili risposte
    const lista = risposte[categoria]; // Prende solo la lista di risposte di quella categoria

    // Sceglie una risposta a caso dalla lista (come pescare un bigliettino da un cappello)
    const random = Math.floor(Math.random() * lista.length);

    res.json({
        risposta: lista[random] // Invia la risposta scelta al sito
    });
});

// Avvia il server: da questo momento l'oracolo è "vivo" e in ascolto
app.listen(PORT, () => {
    console.log("Server attivo su http://localhost:" + PORT);
});