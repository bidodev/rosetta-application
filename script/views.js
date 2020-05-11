import { DOMstrings as elements } from "./elements.js";

//query input value
export const getInput = () => elements.searchQuery.value;

export const clearResults = () => {
  elements.resultDiv.innerHTML = "";
};

const renderBook = (book, query) => {
  console.log(book.volumeInfo);

  const { title, subtitle, description } = book.volumeInfo;

  let markUp = `
    <div class="description">
    <div class="title">Title: ${title}</div>
    <div class="sub-desc">Subtitle: ${subtitle}</div>
    <div class="book-desc">${description}</div>
  </div>`;

  elements.resultDiv.insertAdjacentHTML("beforeend", markUp);
};

export const renderResults = data => {
  //console.log(data);
  const { query, result } = data;

  result.items.forEach(renderBook);
};
