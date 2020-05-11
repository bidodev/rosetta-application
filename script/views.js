import { DOMstrings as elements } from "./elements.js";

//query limit value
export const getInput = () => elements.searchQuery.value;

export const clearResults = () => {
  elements.resultDiv.innerHTML = "";
};

// const renderBook = (element, query) => {
//   let markUp = "";

//   elements.resultDiv.insertAdjacentHTML("beforeend", markUp);
// };

export const renderResults = data => {
  //console.log(data);
  const { query, result } = data;

  const resultsArr = result.items;
  resultsArr.forEach(element => {
    console.log(element);
  });
};
