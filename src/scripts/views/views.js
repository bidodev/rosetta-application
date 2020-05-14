import Search from "../models/Search.js";
import { elements, renderSpinner, removeSpinner } from "../base.js";
import { state } from "../app.js";

//query input value
export const getSearchQuery = () => elements.searchQuery.value;
export const getSearchType = () => elements.searchType.value;
export const clearInput = () => {
  spanX.style.opacity = 0;
  elements.searchQuery.value = "";
};
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

const renderBook = book => {
  let { title, description, authors, pageCount, imageLinks } = book.volumeInfo;
  let { thumbnail } = imageLinks;

  if (!description) {
    description = "No description available";
  }

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

export const renderResults = data => {
  const { result } = data;

  //we make the filters appears again on the page
  elements.result.style.display = "flex";

  result.forEach(renderBook);
};

/** filters()
 * compose the call to the API
 */
export async function filters() {
  //1. Get all the values from the UI to create an object which we're going using to do a new search.
  const filters = {
    query: state.search.query,
    language: elements.filterLanguages.value,
    type: elements.searchType.value,
    max: 8,
    order: elements.orderBy.value,
  };

  //2. Clear previous results before update
  clearResults();

  //3. Sending a new object with all the arguments to perform the search
  const search = new Search(filters);

  //4. Insert the spinner / loader inside the container after the first child
  renderSpinner(elements.resultDiv, "afterbegin");

  //5. Get the results from the Google Books API
  await search.fetchResults();

  //6. Remove the loader from the container
  removeSpinner();

  //7. Destructiring the object
  let { result } = search;

  //8. For each element inside the array call the renderBook function
  result.forEach(renderBook);
}
