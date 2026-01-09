import "./style.css";

const URL = "https://api.artic.edu/api/v1/artworks";



async function getData(URL) {
  try {
    const response = await fetch(URL);
    if (response.status != 200) {
      throw new Error(response);
    } else {
      const data = await response.json(); //makes the data into JSON object we can use
      console.log(data);
      document.getElementById("api-response").textContent = data.name;
    }
  } catch (error) {
    console.log(error);
    console.log("no bueno");
  }
}
getData(URL);

function inject(data) {
  const card = document.createElement("div");
  card.classList.add("display-card");
  card.dataset.id = book.id;
  card.dataset.genre = book.genre.toLowerCase();
  card.dataset.status = "none";

  card.innerHTML = `
    <img class="display-src" src="${art.src}" alt="${art.title}" />
    <h2 class="display-title">${art.title}</h2>
    <h3 class="display-author">${art.author}</h3>
    <h3 class="display-genre">${art.genre}</h3>
    <h5 class="year">${art.year}</h5>
  `;

  displaySection.appendChild(card);
}
