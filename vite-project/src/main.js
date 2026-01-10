import "./style.css";

const URL = "https://api.artic.edu/api/v1/artworks";

async function getData() {
  try {
    const response = await fetch(URL);
    if (response.status != 200) {
      throw new Error(response);
    }
    const data = await response.json(); //makes the data into JSON object we can use
    return data.data;
  } catch (error) {
    console.error("no bueno", error);
  }
}

//     const data = await response.json(); //makes the data into JSON object we can use
//     return data.data.forEach((art) => console.log(art));
//     document.getElementById("api-response").textContent = data.name;
//   }
// } catch (error) {

function inject(art) {
  const container = document.querySelector(".card");
  const card = document.createElement("div");
  card.classList.add("display-card");
  card.dataset.id = art.id;
  // card.dataset.genre = art.genre.toLowerCase();
  // card.dataset.status = "none";
  const imgSrc = art.image_id
    ? `https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg`
    : "";

  card.innerHTML = `
    <img class="display-src" src="${imgSrc}" alt="${art.title}" />
    <h2 class="display-title">${art.title}</h2>
    <h3 class="display-author">${art.artist_title || "Unknown Artist"}</h3>
    <h5 class="year">${art.date_display || ""}</h5>
  `;

  container.appendChild(card);
}

(async function init() {
  const artworks = await getData();
  artworks.forEach((art) => inject(art));
})();

// const container = document.getElementById("app");

// fetch("http://universities.hipolabs.com/search?country=United+States")
//   .then((res) => res.json())
//   .then((data) => {
//     data.slice(0, 10).forEach((uni) => {
//       addCard(uni);
//     });
//   });

// function addCard(uni) {
//   const card = document.createElement("div");
//   card.className = "card";

//   card.innerHTML = `
//     <h2>${uni.name}</h2>
//     <p><strong>Country:</strong> ${uni.country}</p>
//     <a href="${uni.web_pages[0]}" target="_blank">Visit Website</a>
//   `;

//   container.appendChild(card);
// }
