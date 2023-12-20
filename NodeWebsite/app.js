const express = require('express');

const app = express();
const port = 3000;

// Konfiguriere den statischen Datei-Server
app.use(express.static('public'));

// Starte den Server
app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
