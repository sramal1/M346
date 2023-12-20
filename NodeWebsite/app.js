const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Konfiguriere den statischen Datei-Server
app.use(express.static('public'));

// Konfiguriere Multer für das Datei-Handling
const upload = multer({ dest: 'uploads/' });

// AWS SDK konfigurieren
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'deine-region' // Setze deine AWS-Region
});
const s3 = new AWS.S3();

// Route für das Datei-Upload
app.post('/upload', upload.single('image'), function (req, res) {
    const file = req.file;
    
    // Lese den Inhalt der Datei
    const fileContent = fs.readFileSync(file.path);

    // Konfiguriere die Upload-Parameter für S3
    const params = {
        Bucket: 'dein-bucket-name', // Ersetze dies mit deinem S3-Bucket-Namen
        Key: path.basename(file.originalname), // Der Dateiname im S3-Bucket
        Body: fileContent,
        ContentType: file.mimetype
    };

    // Lade das Bild zu AWS S3 hoch
    s3.upload(params, function(err, data) {
        if (err) {
            console.error("Fehler beim Hochladen: ", err);
            return res.status(500).send(err);
        }
        console.log(`Datei erfolgreich hochgeladen. ${data.Location}`);

        // Entferne die temporäre Datei
        fs.unlinkSync(file.path);

        // Sende die Antwort zurück an den Client
        res.json({ message: 'Upload erfolgreich!', url: data.Location });
    });
});

// Starte den Server
app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
