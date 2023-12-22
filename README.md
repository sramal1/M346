# Dokumenation M346

## Ablauf
1. Aktualisieren Sie Ihre credentials auf Ihrer VM mit denen Ihrer AWS. Sie finden das Credential-File unter '~/.aws'.
2. Erstellen Sie unter AWS zwei Buckets mit den folgenden Namen:
	1. original-image-bucket-m346
	2. resize-image-bucket-m346
-> Es ist wichtig, dass diese Namen fuer die Buckets verwendet werden, da sonst die Lambda-Funktion angepasst werden muss.
-> Zudem muessen Sie lediglich den Namen der Buckets setzten und koennen alle weiteren Einstellungen standartisiert lassen.
3. Kopieren Sie den Ordner 'image-resizer-lambda' auf Ihre Linux VM
4. Wechseln Sie in das Verzeichnis, wo Sie den Ordner 'image-resizer-lambda' abgelegt haben (Befehl = cd).
5. Fuehren Sie die Befehle unter dem Unterverzeichnis 'Befehle' aus.
6. Oeffnen Sie nun den Bucket 'original-image-bucket-m346' unter AWS und laden Sie Ihr gewuenschtes File hoch.
Wichtig: Der Filename muss folgendermasen aufgebaut sein: "Prozentangabe wie sehr es verkleinert werden sollte_NamevonDatei.Endung" -> bspw: 50_Testing.png
7. Nach dem Hochladen Ihrer Datei sollten Sie Ihr Fenster nochmals neu laden und die Datei sollte weg sein.
8. Wechseln Sie zu dem zweiten Bucket 'resize-image-bucket-m346', dort sollte nun die verkleinerte Datei liegen und die Verkleinerungsangabe entfernt sein.
9. Laden Sie es mit dem Druecken des Knopfes 'Herunterladen' herunter.


### Befehle
Wichtig: Fuer diese Befehle benoetigen Sie aws, Amazon.Lambda.Tools und dot net Version 6. Zudem wenn Sie die Bucketnamen nicht wie in Punkt 2 aus Kapitel 'Aufbau' haben, muessen Sie die Bucketnamen auch hier ersetzen. Wir gehen in folgenden Befehlen davon aus, dass Sie den 1. Bucket-Namen verwendet haben.
1. dotnet lambda delete-function image-resize-lambda
2. dotnet lambda deploy-function --function-role LabRole image-resize-lambda
3. aws lambda add-permission --function-name image-resize-lambda --action "lambda:InvokeFunction" --principal s3.amazonaws.com --source-arn arn:aws:s3:::original-image-bucket-m346 --statement-id original-image-bucket-m346
4. aws s3api put-bucket-notification-configuration --bucket original-image-bucket-m346 --notification-configuration '{
    "LambdaFunctionConfigurations": [
        {
            "LambdaFunctionArn": "arn:aws:lambda:us-east-1:356558071430:function:image-resize-lambda",
            "Events": [
                "s3:ObjectCreated:Put"
            ]
        }
    ]
}'

### gewuenschter Ablauf
1. kopieren Sie das ganze Repos auf Ihre Linux VM
2. Fuehren Sie das 'initialization.sh' Skript aus. (liegt unter 'Scripts')
-> Dies sollte uns alle Buckets erstellen und die Lambda direkt auf den ersten Bucket hochladen
3. Es oeffnet sich eine Website, wo Sie das Bild durch klicken auf das Input-Feld auswaehlen koennen
4. Sie geben auf der Website in einem zweiten Input-Feld den Verkleinerungswert ein.
5. Bild sollte automatisch verkleinert heruntergeladen werden.

#### Warum es nicht zu stande gekommen ist
1. Die Website ist nicht zustande gekommen, da wir das Bild nicht von der Website auf den ersten Bucket laden konnten.
2. Die Scripts sind nicht zu stande gekommen, da Sie die Lambda-Funktion nicht richtig hochgeladen haben, sprich hat sie nicht mehr funktioniert. Allerdings hat das Script die Buckets erstellt.


## Aufgabenverteilung
| Manuel                    | Raphael                 | Livio                 | Leotrim             |
|---------------------------|-------------------------|-----------------------|---------------------|
| Lambda-Funktion schreiben | Dokumentation & Testing | Website erstellen     | Scripts schreiben   |


## Reflexion

### Raphael Hilti

### Livio Dörig

### Manuel Bühler

### Leotrim Ramadani
