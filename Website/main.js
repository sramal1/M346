document.addEventListener("DOMContentLoaded", function () {
   var fileUpload = document.getElementById("file-upload");
   var submitButton = document.getElementById("submit-button");
   var previewContainer = document.getElementById("image-preview");

   var s3 = new AWS.S3({
      apiVersion: '2006-03-01'
   });

   fileUpload.addEventListener("change", function (event) {
      var file = fileUpload.files[0];

      if (file && file.type === "image/png") {
         var reader = new FileReader();
         reader.onload = function (e) {
            previewContainer.innerHTML =
               '<img src="' +
               e.target.result +
               '" alt="Vorschau" class="image-preview">';
            var image = new Image();
            image.onload = function () {
               var imageInfo = document.getElementById("image-info");
               imageInfo.textContent = this.width + " x " + this.height;
            };
            image.src = e.target.result;
         };
         reader.readAsDataURL(file);
      } else if (file && file.type !== "image/png") {
         alert("Bitte wählen Sie nur eine .png Datei aus.");
         fileUpload.value = "";
      }
   });

   submitButton.addEventListener("click", function (event) {
      if (fileUpload.files.length === 0) {
         alert("Bitte wählen Sie zuerst eine Datei aus!");
         event.preventDefault();
      } else {
         var file = fileUpload.files[0];
         var scaleValue = document.getElementById('scale-select').value;
         var scaleNumber = scaleValue * 100;
         var originalFileName = file.name;
 
         // Generierung des neuen Dateinamens
         var newFileName = scaleNumber + "_" + originalFileName;
         console.log(newFileName);

         var newFileName = scaleNumber + "_" + originalFileName;
         console.log(newFileName);
         var uploadParams = {
            Bucket: 'Ihr-Bucket-Name', // Ersetzen Sie dies durch Ihren Bucket-Namen
            Key: fileName + ".png",
            Body: file
         };

         function downloadImage(imageUrl) {
            // Erstellen eines temporären 'a'-Tags
            var downloadLink = document.createElement("a");
            downloadLink.href = imageUrl;
            downloadLink.download = "DownloadedImage.png"; // Sie können den Dateinamen anpassen

            // Hinzufügen des Links zum Dokument und Auslösen des Klicks
            document.body.appendChild(downloadLink);
            downloadLink.click();

            // Entfernen des Links nach dem Download
            document.body.removeChild(downloadLink);
         }

         s3.upload(uploadParams, function (err, data) {
            if (err) {
               console.log("Error", err);
            } if (data) {
               console.log("Upload Success", data.Location);
               // Hier Lambda-Funktion aufrufen
               invokeLambdaFunction(data.Location, function (response) {
                  // Automatischer Download des verarbeiteten Bildes
                  downloadImage(response.processedImageUrl);
               });
            }
         });
      }
   });
});
