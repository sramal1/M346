#!/bin/bash

# Cloud Projekt Arbeit
# Gruppe: Livio, Manuel, Raphael, Leotrim


# Benutzer nach dem Dateipfad fragen
read -p "Geben Sie den Dateipfad an, den Sie hochladen möchten: " FILE_PATH

BUCKET_NAME_ORIGINAL='original-image-bucket-m346'

# Datei auf den AWS S3-Bucket hochladen
aws s3 cp "$FILE_PATH" "s3://$BUCKET_NAME_ORIGINAL/"
