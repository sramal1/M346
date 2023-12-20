# M346

## Ablauf
1. Foto auf Website hochladen
2. Speichern drücken
	1. Java-Funktion lädt das hineingeladene Bild auf den ersten S3 hoch
	2. Durch das neue hinzugefügte Bild auf den ersten S3 wird Lambda-Funktion direkt gestartet
	3. Lambda-Funktion verkleinert Bild und lädt es auf den zweiten S3 hoch
	4. Sobald zweiter S3 ein neues Bild bekommt, wird dieses direkt wieder zurückgegeben
3. Bild wird heruntergeladen

## Herr Frueh vorbereiten vor testen
... 

## Reflexion

### Raphael Hilti

### Livio Dörig

### Manuel Bühler

### Leotrim Ramadani
