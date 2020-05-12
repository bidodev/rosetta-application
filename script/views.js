import { DOMstrings as elements } from "./elements.js";
import Search from "./models/Search.js";

//query input value
export const getInput = () => {
  const searchQuery = elements.searchQuery.value;
  return encodeURI(searchQuery);
};

export const clearInput = () => (elements.searchQuery.value = "");

export const clearResults = () => {
  elements.resultDiv.innerHTML = "";
};

const renderBook = book => {
  let { title, description, authors, pageCount, imageLinks } = book.volumeInfo;

  let markUp = `
    <div class="description">
    <div class="title">Title: ${title}</div>
    <div class="sub-desc">Authors: <a>${renderBooksbyAuthor(
      authors
    )}</a> . Pages: ${pageCount}</div>
    <figure class="thumb-image">
      <img src="${imageLinks.thumbnail}" alt="${title}" srcset="">
    </figure>
    <div class="book-desc">${description} <a href="http://">Read More...</a></div>
  </div>`;

  elements.resultDiv.insertAdjacentHTML("beforeend", markUp);
};

function renderBooksbyAuthor(authors) {
  // const search = new Search("harry potter", authors);
  // await search.filterbyAuthor();
  // console.log(search);
  return `${authors}`;
}

export const renderResults = data => {
  const { query, result } = data;
  // console.log(decodeURI(query));

  //make the filters appear again
  document.querySelector(".filters").style.display = "flex";

  result.forEach(renderBook);
};

// filterLanguages
const select = document.querySelectorAll(".search-languages option");

for (const button of select) {
  button.addEventListener("click", async function (event) {
    const query = getInput();
    const language = event.target.value;

    const search = new Search(query, language);
    //fetch the data from the API.
    await search.fetchResults();

    //Prepare the UI for the RESULTS.
    clearResults();
    search.result.forEach(renderBook);
  });
}

// //create event
// document
//   .querySelector(".search-languages")
//   .addEventListener("click", filterLanguages);

// async function filterLanguages(event) {
//   const language = event.target.value;
//   const search = new Search(query, language);
//   await search.fetchResults();

//   //Prepare the UI for the RESULTS.
//   clearResults();
//   search.result.forEach(renderBook);
// }
