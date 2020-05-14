import { elements, renderSpinner, removeSpinner } from "./base.js";
import Search from "./models/Search.js";

//query input value
export const getSearchQuery = () => elements.searchQuery.value;
export const getSearchType = () => elements.searchType.value;
export const clearInput = () => (elements.searchQuery.value = "");
export const clearResults = () => (elements.resultDiv.innerHTML = "");
//finction to scroll to the top of the page
export const goUp = () => {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
};
//function to scroll into the results
export const scrollToResultPage = () => {
  elements.result.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest",
  });
};

/** Limit string..
 *
 */
const limitResults = (str, limit) => {
  const res = [];

  if (str.length > limit) {
    str.split(" ").reduce((acc, cur) => {
      if (acc + cur.length < limit) {
        res.push(cur);
      }
      return acc + cur.length;
    }, 0);
    return `${res.join(" ")}...`;
  }
  return str;
};

const renderBook = (book) => {
  let { title, description, authors, pageCount, imageLinks } = book.volumeInfo;
  let { thumbnail } = imageLinks;

  if (!description) {
    description = "No description available";
  }
  console.log(imageLinks);

  let markUp = `
    <div class="quote">
      <h3>${limitResults(title, 20)}</h3>
      <h6>${authors} - <span>${pageCount} pages</span></h6>
      <img class="img-box img1" src="${thumbnail}" alt="${title}" />
      <p>
      ${limitResults(description, 300)}
      </p>
      
    </div>
  `;

  elements.resultDiv.insertAdjacentHTML("beforeend", markUp);
};

export const renderResults = (data) => {
  const { query, result } = data;
  // console.log(decodeURI(query));

  //we make the filters appears again on the page
  elements.result.style.display = "flex";

  result.forEach(renderBook);
};

/** filters()
 * compose the call to the API
 */
export async function filters() {
  const filters = {
    query: getSearchQuery(),
    language: document.querySelector(".search-languages").value,
    type: document.querySelector(".select-type").value,
    max: 8,
    order: document.querySelector(".order-by").value,
  };
  clearResults();

  const search = new Search(filters);

  //change the status of the search button..
  renderSpinner(elements.resultDiv, "afterbegin");

  //fetch the data from the API.
  await search.fetchResults();

  //Prepare the UI for the RESULTS.
  removeSpinner();

  search.result.forEach(renderBook);
}
