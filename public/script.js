/*const fileInput = document.querySelector(".form-image");
const carouselContainer = document.querySelector('.carousel-inner');
    
    fileInput.addEventListener('change', (event) => {
      alert("Event trigerred!!");
      const files = event.target.files;
    
      carouselContainer.innerHTML = ""; // Clear previous previews (optional)
      var i = 0;
    
      for (const file of files) {
        // Check file type (optional)
        if (!file.type.match('image.*')) {
          continue; // Skip non-image files
        }
    
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = document.createElement('img');
          const division = document.createElement('div');
          if(i==0){
            division.classList.add('carousel-item active');
            i++;
          }
          else{
            division.classList.add('carousel-item');
          }
          img.src = e.target.result;
          img.classList.add('carousel-item');
          img.classList.add('d-block');
          img.classList.add('w-100');
          img.classList.add('carousel-item-narrower'); // Add a class for styling
          division.appendChild(img);
          carouselContainer.appendChild(division);
        };
        reader.readAsDataURL(file);
      }
    });
*/

var dbuttons = document.querySelectorAll("button.delete");
var ebuttons = document.querySelectorAll("button.edit");

for(var i=0;i<dbuttons.length;i++){
  dbuttons[i].addEventListener("click",function(){
    var ID = this.id;
    var url = `/${ID}`;
    fetch(url, { method: "DELETE" })
      .then(response => {
        if (response.ok) {
          console.log("Blog Deleted");
          window.location.reload();
        } else {
          console.error("Error deleting item");
          window.location.reload();
        }
      });
  })
}

