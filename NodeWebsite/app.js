const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});


const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.static('public'));

// Konfiguriere Multer (Hier kannst du auch das Speicherverhalten anpassen)
const upload = multer({ dest: 'uploads/' });

// AWS SDK konfigurieren
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'deine-region'
});
const s3 = new AWS.S3();

app.post('/upload', upload.single('image'), function (req, res) {
    const file = req.file;
    const scale = req.body.scale;

    // Hier kannst du eventuell das Bild basierend auf dem Skalierungsfaktor bearbeiten

    // Lies die Datei
    const fileContent = fs.readFileSync(file.path);

    // Konfiguriere die Upload-Parameter
    const params = {
        Bucket: 'dein-bucket-name', // Ersetze durch deinen Bucket-Namen
        Key: file.originalname, // Dateiname im Bucket
        Body: fileContent
    };

    // Lade das Bild zu S3 hoch
    s3.upload(params, function (err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);

        // Antwort an den Client senden
        res.json({ message: 'Upload erfolgreich!', location: data.Location });
    });
});

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});




//start server: node app.js

//server stoppen: ctrl + c