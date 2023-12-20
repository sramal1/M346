const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static('public'));

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
    
    const fileContent = fs.readFileSync(file.path);

    // Konfiguriere die Upload-Parameter für S3
    const params = {
        Bucket: 'dein-bucket-name',
        Key: path.basename(file.originalname),
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

        fs.unlinkSync(file.path);

        // Sende die Antwort zurück an den Client
        res.json({ message: 'Upload erfolgreich!', url: data.Location });
    });
});

// Starte den Server
app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
