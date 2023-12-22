# Dokumenation M346

## Ablauf
1. Aktualisieren Sie Ihre credentials auf Ihrer VM mit denen Ihrer AWS. Sie finden das Credential-File unter '~/.aws'.
2. Kopieren Sie dass ganze Repos in Ihre Linux VM
3. Navigieren Sie in den 'Scripts'-Ordner (Befehl = cd)
4. Geben Sie folgende drei Befehle ein:
	1. sudo apt install dos2unix
	2. dos2unix initialization.sh
	3. ./initialization.sh
-> Die Buckets sollten jetzt erstellt worden sein, und die Lambda-Funktion sollte im ersten Bucket hochgeladen worden sein.
5. Wechseln Sie auf AWS und klicken Sie auf den 'original-image-bucket-m346'. Laden Sie ein Foto ihrer Wahl hoch.

-> Die Dateienbezeichnung ist wichtig, anonsten erkennt die Lambda die Datei nicht. Der Dateiname sollte folgendermasen aufgebaut sein: 'Verkleinerungsgrad_Dateiname.Dateiendung'. Bspw '50_Testing1.png'

6. Wechseln Sie auf AWS zu Ihrem zweiten Bucket mit dem Namen 'resize-image-bucket-m346'. Dort sollte nach kurzer Zeit schon Ihr verkleinertes Bild abgelegt auftauchen.


### gewuenschter Ablauf
1. kopieren Sie das ganze Repos auf Ihre Linux VM
2. Fuehren Sie das 'initialization.sh' Skript aus.
3. Es oeffnet sich eine Website, wo Sie das Bild durch klicken auf das Input-Feld auswaehlen koennen.
4. Sie geben auf der Website in einem zweiten Input-Feld den Verkleinerungswert ein.
5. Bild sollte automatisch verkleinert heruntergeladen werden.

#### Warum es nicht zu stande gekommen ist
1. Die Website ist nicht zustande gekommen, da wir das Bild nicht von der Website auf den ersten Bucket laden konnten, dadurch konnten wir die gewuenschten Schritte 3 - 5 nicht umsetzten koennen.


## Aufgabenverteilung
| Manuel                    | Raphael                 | Livio                 | Leotrim             |
|---------------------------|-------------------------|-----------------------|---------------------|
| Lambda-Funktion schreiben | Dokumentation & Testing | Website erstellen     | Scripts schreiben   |

## Tests
Unsere Tests sind in einem eigenen Dokument beschrieben. Dies liegt unter folgendem Pfad ['Testing/Test_Dokumenation_M364_Gruppe1.md']('\Testing\Test_Dokumenation_M364_Gruppe1.md')

## Reflexion

### Raphael Hilti
Ich habe in diesem Projekt nicht wirklich viel Code geschrieben, trotz allem viel gelernt. Ich habe viel besser verstanden, wie die virtuelle Maschine mit AWS interagiert und wie solche Skripte, beispielsweise fuer das Erstellen von Buckets, aussehen. Zusammengefasst von meinen Neugelernten, kann ich sagen, dass ich mich einfach besser in AWS und rund um die Cloud auskenne. Negative Erfahrungen habe ich mit diesem Projekt nicht wirklich gemacht, ich habe bloss gemerkt, wie empfindlich AWS ist und dass ein kleiner Fehler schon dazu fuehrt, dass nichts funktioniert. Ausserdem ist es auch sehr muehsam, die Umgebung aufzusetzen.


### Livio Dörig

### Manuel Bühler

### Leotrim Ramadani
