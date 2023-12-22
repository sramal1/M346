# Dokumenation M346

## Ablauf
1. Foto auf Website hochladen
2. Speichern drücken
	1. Java-Funktion lädt das hineingeladene Bild auf den ersten S3 hoch
	2. Durch das neue hinzugefügte Bild auf den ersten S3 wird Lambda-Funktion direkt gestartet
	3. Lambda-Funktion verkleinert Bild und lädt es auf den zweiten S3 hoch
	4. Sobald zweiter S3 ein neues Bild bekommt, wird dieses direkt wieder zurückgegeben
3. Bild wird heruntergeladen

## Aufbau
1. Aktualisieren Sie Ihre credentials auf Ihrer VM mit denen Ihrer AWS. Sie finden das Credential-File unter '~/.aws'.
2. Erstellen Sie unter AWS zwei Buckets mit den folgenden Namen:
	1. original-image-bucket-m346
	2. resize-image-bucket-m346
-> Es ist wichtig, dass diese Namen fuer die Buckets verwendet werden, da sonst die Lambda-Funktion angepasst werden muss.
-> Zudem muessen Sie lediglich den Namen der Buckets setzten und koennen alle weiteren Einstellungen standartisiert lassen.
3. Kopieren Sie den Ordner 'image-resizer-lambda' auf Ihre Linux VM
4. Wechseln Sie in das Verzeichnis, wo Sie den Ordner 'image-resizer-lambda' abgelegt haben (Befehl = cd).
5. Fuehren Sie die Befehle unter dem Unterverzeichnis 'Befehle' aus


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


## Reflexion

### Raphael Hilti

### Livio Dörig

### Manuel Bühler

### Leotrim Ramadani
