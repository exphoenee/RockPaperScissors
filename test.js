const baseURL = "http://127.0.0.1:5500/media/";

function asynImageLoader(img) {
  const fileName = img.dataset.filename;
  fetch(`${baseURL}${fileName}`).then((response) =>
    response
      .blob()
      .then((blob) => {
        img.src = URL.createObjectURL(blob);
        img.classList.remove("loader-image");
      })
      .catch((error) => console.log(error))
  );
}

const img = document.querySelector("img");

asynImageLoader(img);
