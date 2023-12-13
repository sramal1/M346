document.addEventListener("DOMContentLoaded", function () {
   var fileUpload = document.getElementById("file-upload");
   var submitButton = document.getElementById("submit-button");
   var previewContainer = document.getElementById("image-preview");


   //AWS CONFIGURE
   AWS.config.update({
      region: 'Ihre-Region', // Ersetzen Sie dies durch Ihre Region
      credentials: new AWS.CognitoIdentityCredentials({
         IdentityPoolId: 'Ihr-Identity-Pool-Id' // Ersetzen Sie dies durch Ihren Identity Pool ID
      })
   });

   var s3 = new AWS.S3({
      apiVersion: '2006-03-01'
   });


   function triggerChangeEvent(element) {
      var event = new Event("change");
      element.dispatchEvent(event);
   }

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
         var fileName = scaleValue * 100;
         console.log(fileName);
         var uploadParams = {
            Bucket: 'Ihr-Bucket-Name', // Ersetzen Sie dies durch Ihren Bucket-Namen
            Key: fileName + ".png",
            Body: file
         };

         s3.upload(uploadParams, function (err, data) {
            if (err) {
               console.log("Error", err);
            } if (data) {
               console.log("Upload Success", data.Location);
            }
         });
      }
   });
});