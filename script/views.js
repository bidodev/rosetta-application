import { DOMstrings as elements } from "./elements.js";

//query input value
export const getInput = () => elements.searchQuery.value;

export const clearResults = () => {
  elements.resultDiv.innerHTML = "";
};

const renderBook = book => {
  let { title, description, authors, imageLinks } = book.volumeInfo;

  description ? description : (description = "No Description");

  let markUp = `
    <div class="description">
    <div class="title">Title: ${title}</div>
    <div class="sub-desc">Authors: ${authors}</div>
    <figure class="thumb-image">
      <img src="${imageLinks.thumbnail}" alt="${title}" srcset="">
    </figure>
    <div class="book-desc">${description}</div>
  </div>`;

  elements.resultDiv.insertAdjacentHTML("beforeend", markUp);
};

export const renderResults = data => {
  const { query, result } = data;

  let markUp = `
  The search for ${query} has ${result.length} results
`;
  elements.resultDiv.insertAdjacentHTML("beforeend", markUp);

  result.forEach(renderBook);
};
