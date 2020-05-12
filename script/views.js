import { DOMstrings as elements } from "./elements.js";
import Search from "./models/Search.js";

//query input value
export const getSearchQuery = () => elements.searchQuery.value;

export const getSearchType = () => elements.searchType.value;

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
  const { result } = data;
  // console.log(decodeURI(query));

  //make the filters appear again
  document.querySelector(".filters").style.display = "flex";

  result.forEach(renderBook);
};

// filterLanguages
async function filterLanguages() {
  const query = getSearchQuery();

  const language = event.target.value;

  const search = new Search(query, language);
  //fetch the data from the API.
  await search.fetchResults();

  //Prepare the UI for the RESULTS.
  clearResults();
  search.result.forEach(renderBook);
}

elements.filterLanguages.addEventListener("change", filterLanguages);
