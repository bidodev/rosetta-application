import { DOMstrings as elements } from "./elements.js";

//query input value
export const getInput = () => elements.searchQuery.value;

export const clearResults = () => {
  elements.resultDiv.innerHTML = "";
};

const renderBook = (book, query) => {
  console.log(book.volumeInfo);

  let { title, description, authors } = book.volumeInfo;

  description ? description : (description = "No Description");

  let markUp = `
    <div class="description">
    <div class="title">Title: ${title}</div>
    <div class="sub-desc">Authors: ${authors}</div>
    <div class="book-desc">${description}</div>
  </div>`;

  elements.resultDiv.insertAdjacentHTML("beforeend", markUp);
};

export const renderResults = data => {
  //console.log(data);
  const { query, result } = data;

  result.items.forEach(renderBook);
};
