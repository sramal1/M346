const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.REGION
});

const app = express();
const upload = multer({ dest: 'uploads/' });

const s3 = new AWS.S3();

app.use(express.static('public'));

app.post('/upload', upload.single('image'), function (req, res) {
  const file = req.file;
  const fileContent = fs.readFileSync(file.path);

  const uploadParams = {
    Bucket: 'original-image-bucket',
    Key: path.basename(file.originalname),
    Body: fileContent
  };

  s3.upload(uploadParams, function (err, data) {
    if (err) {
      console.error("Fehler beim Hochladen: ", err);
      return res.status(500).send(err);
    }
    console.log(`Datei erfolgreich hochgeladen. ${data.Location}`);

    fs.unlinkSync(file.path); // Temporäre Datei löschen

    res.json({ message: 'Upload erfolgreich!', url: data.Location });
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
