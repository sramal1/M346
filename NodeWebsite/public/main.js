document.addEventListener("DOMContentLoaded", function () {
   var fileUpload = document.getElementById("file-upload");
   var submitButton = document.getElementById("submit-button");
   var previewContainer = document.getElementById("image-preview");

   fileUpload.addEventListener("change", function (event) {
       var file = fileUpload.files[0];

       if (file && file.type === "image/png") {
           var reader = new FileReader();
           reader.onload = function (e) {
               previewContainer.innerHTML =
                   '<img src="' +
                   e.target.result +
                   '" alt="Vorschau" class="image-preview">';
           };
           reader.readAsDataURL(file);
       } else if (file && file.type !== "image/png") {
           alert("Bitte wählen Sie nur eine .png Datei aus.");
           fileUpload.value = "";
       }
   });

   submitButton.addEventListener("click", function (event) {
       event.preventDefault();
       if (fileUpload.files.length === 0) {
           alert("Bitte wählen Sie zuerst eine Datei aus!");
       } else {
           var formData = new FormData();
           var file = fileUpload.files[0];
           formData.append("image", file);
           formData.append("scale", document.getElementById('scale-select').value);

           fetch('/upload', {
               method: 'POST',
               body: formData
           })
           .then(response => response.json())
           .then(data => {
               console.log(data);
               // Hier könnten Sie beispielsweise eine Nachricht anzeigen, dass das Bild erfolgreich hochgeladen wurde.
           })
           .catch(error => {
               console.log('Fehler beim Hochladen:', error);
           });
       }
   });
});
