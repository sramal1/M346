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

5. Bleiben Sie im gleichen Verzeichnis und geben Sie folgenden Befehl ein:
	1. ./PictureUpload.sh

-> Geben Sie bitte den vollen Pfad ein
-> Die Dateienbezeichnung ist wichtig, anonsten erkennt die Lambda die Datei nicht. Der Dateiname sollte folgendermasen aufgebaut sein: 'Verkleinerungsgrad_Dateiname.Dateiendung'. Bspw '50_Testing1.png'

-> Diese Script sollte Ihnen Ihr gewuenschtes Foto auf den ersten Bucket hochladen

6. Wechseln Sie auf AWS zu Ihrem zweiten Bucket mit dem Namen 'resize-image-bucket-m346'. Dort sollte nach kurzer Zeit schon Ihr verkleinertes Bild abgelegt auftauchen.
7. Klicken Sie auf herunterladen und Ihr Bild sollte verkleinert sein.
-> Schauen Sie bevor Sie herunterladen klicken, in Ihr Temp-Verzeichnis, je nach Konfiguraion Ihrer VM, kann das File dort abgelegt worden sein.


### gewuenschter Ablauf
1. kopieren Sie das ganze Repos auf Ihre Linux VM
2. Fuehren Sie das 'initialization.sh' Skript aus.
3. Es oeffnet sich eine Website, wo Sie das Bild durch klicken auf das Input-Feld auswaehlen koennen.
4. Sie geben auf der Website in einem zweiten Input-Feld den Verkleinerungswert ein.
5. Bild sollte automatisch verkleinert heruntergeladen werden.

#### Warum es nicht zu stande gekommen ist
1. Die Website ist nicht zustande gekommen, da wir das Bild nicht von der Website auf den ersten Bucket laden konnten, dadurch konnten wir die gewuenschten Schritte 3 - 5 nicht umsetzten koennen. Wir haben nun als Ersatz, ein Script geschrieben, welches den Dateipfad als Eingabe, entgegennimmt und dann das File auf den Bucket hochlaedt.


## Aufgabenverteilung
| Manuel                    | Raphael                                       | Livio                 | Leotrim             |
|---------------------------|-----------------------------------------------|-----------------------|---------------------|
| Lambda-Funktion schreiben | Dokumentation & Testing (kleiner Anpassungen) | Website erstellen     | Scripts schreiben   |

## Tests
Unsere Tests sind in einem eigenen Dokument beschrieben. Dies liegt unter folgendem Pfad ['Testing/Test_Dokumenation_M364_Gruppe1.md'](Testing/Test_Dokumenation_M364_Gruppe1.md)

## Reflexion

### Raphael Hilti
Ich habe in diesem Projekt nicht wirklich viel Code geschrieben, trotz allem viel gelernt. Ich habe viel besser verstanden, wie die virtuelle Maschine mit AWS interagiert und wie solche Skripte, beispielsweise fuer das Erstellen von Buckets, aussehen. Zusammengefasst von meinen Neugelernten, kann ich sagen, dass ich mich einfach besser in AWS und rund um die Cloud auskenne. Negative Erfahrungen habe ich mit diesem Projekt nicht wirklich gemacht, ich habe bloss gemerkt, wie empfindlich AWS ist und dass ein kleiner Fehler schon dazu fuehrt, dass nichts funktioniert. Ausserdem ist es auch sehr muehsam, die Umgebung aufzusetzen.


### Livio Dörig

### Manuel Bühler
Zu Beginn des Projekts hatte ich Schwierigkeiten, mir genau vorzustellen, wie das Projekt funktionieren soll und wie es aufgebaut ist. Diese Herausforderung verbesserte sich jedoch im Verlauf des Projekts. Als die Aufgaben verteilt wurden, entschied ich mich für die Lambda-Funktion, da ich bereits mit C# vertraut bin. Auch hier fiel es mir anfangs schwer, einen guten Einstieg zu finden. Dieses Problem konnte ich jedoch durch die Verwendung des Amazon SDK für Visual Studio lösen, da damit direkt ein leeres Lambda-Projekt erstellt wurde. Das Entwickeln der Lambda-Funktion gestaltete sich dadurch eher wie das Schreiben eines Skripts.

Bis jetzt (Stand Freitag, 17:00 Uhr) wurde das Probleme mit dem Setup  nicht gelöst, wodurch etwa die Hälfte des Projekts nicht funktionsfähig ist. Auch in anderen Bereichen, wie der Webseite, traten spät erkannte Probleme auf. Mit einer besseren Planung und einer früheren provisorischen Fertigstellung hätten diese wahrscheinlich behoben werden können.

Für das nächste Projekt würde ich beibehalten, dass jeder einen festen Teilbereich hat, für den er verantwortlich ist. Allerdings sollten alle Teile etwa drei Tage vor dem Projektende fertig sein, um ausführliche Tests durchzuführen und Probleme frühzeitig zu erkennen und zu beheben.

### Leotrim Ramadani
Das Projekt hat mir extrem viel Spaß gemacht, hat jedoch auch viele Nerven gekostet. Das Erstellen des Init-Scripts war äußerst mühsam, mit vielen Fehlern, die nicht sofort klar ersichtlich waren. Das Schlimmste war, wenn es keine Fehler gab, aber es trotzdem nicht richtig funktionierte. Ich habe zahlreiche Foren, Blogs und offizielle Dokumentationen durchsucht. Oft habe ich auch die KI genutzt, jedoch war es trotzdem nicht einfach. Dennoch hat es viel Spaß gemacht, und das Gefühl, wenn etwas endlich funktioniert hat, war extrem befriedigend. Ich hoffe, es gibt in der Zukunft mehr solcher Projekte.