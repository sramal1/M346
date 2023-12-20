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
          var file = fileUpload.files[0];
          var scaleValue = document.getElementById('scale-select').value;
  
          // Berechne den Skalierungsfaktor und erstelle den neuen Dateinamen
          var scaleNumber = parseInt(scaleValue * 100);
          var newFileName = scaleNumber + "_" + file.name;
  
          // Erstelle einen neuen Blob, der das Bild repräsentiert
          var blob = file.slice(0, file.size, file.type); 
          var newFile = new File([blob], newFileName, { type: file.type });
  
          // Füge das Bild mit dem neuen Dateinamen zu FormData hinzu
          var formData = new FormData();
          formData.append("image", newFile);
  
          fetch('/upload', {
              method: 'POST',
              body: formData
          })
          .then(response => response.json())
          .then(data => {
              console.log(data);
          })
          .catch(error => {
              console.log('Fehler beim Hochladen:', error);
          });
      }
  });
  
});
