import "./style.css";

const URL = "http://universities.hipolabs.com/search?name=middle";



// http://universities.hipolabs.com/search?name=middle

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
    <img class="display-src" src="${book.src}" alt="${book.title}" />
    <h2 class="display-title">${book.title}</h2>
    <h3 class="display-author">${book.author}</h3>
    <h3 class="display-genre">${book.genre}</h3>
    <h5 class="year">${book.year}</h5>

    <button class="want-btn">Want to Read</button>
    <button class="buy-btn">Want to Buy</button>
    <button class="read-btn">Already Read</button>
  `;

  displaySection.appendChild(card);
}
