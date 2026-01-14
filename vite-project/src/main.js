import "./style.css";

let allArtworks = [];
//stores all objects from API
const URL = "https://api.artic.edu/api/v1/artworks";
//stores api in constant
async function getData() {
  //async function returns a promise
  try {
    const response = await fetch(URL); //fetches data from API and waits for it to arrive
    if (response.status != 200) {
      //checks if response is not ok (200 means success)
      throw new Error(response); //sends error to catch block
    }
    const data = await response.json(); //makes the data into JSON object we can use //await is needed bc this is asynchronous
    return data.data; //returns only the array of artworks
  } catch (error) {
    //runs if there is an error in try block
    console.error("no bueno", error);
  }
}

//     const data = await response.json(); //makes the data into JSON object we can use
//     return data.data.forEach((art) => console.log(art));
//     document.getElementById("api-response").textContent = data.name;
//   }
// } catch (error) {

function clearCards() {
  const container = document.querySelector(".card"); //finds card element in DOM manipulator (this is wear artwork cards are)
  container.innerHTML = ""; //clears all existing cards by setting innerHTML to empty string
}

function inject(art) {
  const container = document.querySelector(".card");

  const card = document.createElement("div");
  card.dataset.id = art.id;

  const imgSrc = art.image_id
    ? `https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg`
    : "https://via.placeholder.com/800x600?text=No+Image";

  card.innerHTML = `
    <div class="w-full max-w-xs overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg shadow-slate-950/5">
      <img
        class="m-1.5 h-max w-[calc(100%-12px)] rounded-[5px]"
        src="${imgSrc}"
        alt="${art.title}"
      />

      <div class="h-max w-full rounded px-3 py-2">
        <h6 class="font-sans text-base font-bold text-current antialiased md:text-lg lg:text-xl">
          ${art.title}
        </h6>

        <p class="my-1 font-sans text-base text-slate-600 antialiased">
          ${art.artist_title || "Unknown Artist"}
        </p>
      </div>

      <div class="w-full rounded px-3 pb-3 pt-1.5">
        <button
          class="inline-flex rounded-md border border-slate-800 bg-slate-800 px-4 py-2 text-center font-sans text-sm font-medium text-slate-50 transition-all duration-300 ease-in hover:border-slate-700 hover:bg-slate-700"
        >
          Read More
        </button>
      </div>
    </div>
  `;

  container.appendChild(card);

  // function inject(art) {
  //   //creates one card (one artwork object at a time)
  //   const container = document.querySelector(".card"); //selects container element where cards will be added (parent container)
  //   const card = document.createElement("div");
  //   card.classList.add("display-card"); //new class for styling
  //   card.dataset.id = art.id; //adds an id that'll ne useful for filtering later
  //   // card.dataset.genre = art.genre.toLowerCase();
  //   // card.dataset.status = "none";
  //   const imgSrc = art.image_id //checks if artwork has an image
  //     ? `https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg` //if it does, constructs the image URL using the image_id for the artwork
  //     : ""; //if it doesn't, sets imgSrc to an empty string to avoid broken image links
  //   //? and : are ternary operators, shorthand for if-else statement (more concise)
  //   //this is boolean conditional statement (? is true, : is false)

  //   // same as: let imgSrc;
  //   // if (art.image_id) {
  //   //   imgSrc = `https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg`;
  //   // } else {
  //   //   imgSrc = "";
  //   // }

  card.innerHTML = ` 
    <img class="display-src" src="${imgSrc}" alt="${art.title}" />
    <h2 class="display-title">${art.title}</h2>
    <h3 class="display-author">${art.artist_title || "Unknown Artist"}</h3> 
    <h5 class="year">${art.date_display || ""}</h5> 
  `;

  container.appendChild(card); //adds card to page
}

(async function init() {
  //runs automatically when script loads
  allArtworks = await getData(); //fetches all artworks from API and stores them in allArtworks array
  allArtworks.forEach((art) => inject(art)); //loops through all artworks and creates a card for each one by calling inject function (displays them on page load)
})();

document.addEventListener("DOMContentLoaded", () => {
  //waits until HTML if fully loaded
  const searchInput = document.getElementById("search"); //selects search input element

  if (!searchInput) return; //prevents errors if search input is not found, returns the function

  searchInput.addEventListener("input", (e) => {
    //runs whenever user types in search input
    const searchTerm = e.target.value.toLowerCase(); //reads the text & converts it to lowercase for case-insensitive search

    const filteredArt = allArtworks.filter((art) => {
      //creates NEW array for only the artworks that matcht the search
      const title = art.title?.toLowerCase() || ""; //reads title and artist, converts to lowercase, uses optional chaining to avoid errors if title or artist is missing
      const artist = art.artist_title?.toLowerCase() || ""; //similar to date/year handling in inject function

      return title.includes(searchTerm) || artist.includes(searchTerm); //only keeps artworks when title or artist matches in the search
    });

    clearCards(); //removes old cards from page
    filteredArt.forEach((art) => inject(art)); //displays filtered results by creating new cards for each matching artwork
  });
});

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
