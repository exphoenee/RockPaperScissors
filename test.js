const baseURL = "http://127.0.0.1:5500/media/";

function asynImageLoader(fileName, img) {
  fetch(`${baseURL}${fileName}`).then((response) =>
    response
      .blob()
      .then((blob) => {
        console.log(blob);
        img.src = URL.createObjectURL(blob);
      })
      .catch((error) => console.log(error))
  );
}

const imgeName = "scissors.png";
const img = document.querySelector("img");

asynImageLoader(imgeName, img);
