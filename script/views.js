import { DOMstrings as elements } from "./elements.js";

//query input value
export const getInput = () => elements.searchQuery.value;

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

const renderBooksbyAuthor = authors => {
  return `${authors}`;
};

export const renderResults = data => {
  const { query, result } = data;

  let markUp = `
  The search for ${query} has ${result.length} results
`;
  elements.resultDiv.insertAdjacentHTML("beforeend", markUp);

  result.forEach(renderBook);
};
