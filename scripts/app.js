//IMPORT BASE / CLASSES / VIEWS //

//import all DOM queries as elements..
import { elements, renderSpinner } from "./base.js";

//import Search class
import Search from "./models/Search.js";

//import everything which is public from views as searcView
import * as searchView from "./views.js";

//default language for the search
const defaultLanguage = "en";

/**Global state of the application
 * - Search object
 * - Description object
 * - Books object
 */
const state = {};

//MAIN CONTROLLER
const controlSearch = async () => {
  try {
    const defSearch = {
      // get the values from the user..
      query: searchView.getSearchQuery(),
      //default language to search..
      language: defaultLanguage,
    };

    /**
     * First we create a new instance of class Search, it will create an object..
     * query = value from the user Input.
     * type = title, author and so on..
     * result = value with the data from GOOGLE BOOKS API
     */
    state.search = new Search(defSearch);

    //search for books based on the query values the Google Books API.
    //since we can only render the results after having the data, we need to use await.
    await state.search.fetchResults();

    //render results on the UI
    if (state.search.result) {
      //1. Prepare the Section for the results.
      searchView.clearResults();

      //send our data to the function to be render the books
      searchView.renderResults(state.search);

      //jump to the results
      searchView.scrollToResultPage();
    }
  } catch (error) {
    console.log(error);
  }
};

//EVENTS HANDLER

//SEARCH BUTTON
elements.fetchBtn.addEventListener("click", controlSearch);

//EVENTS HANDLER FOR THE FILTERS BUTTONS
//ORDERS RESULTS BY TYPE
elements.searchType.addEventListener("change", searchView.filters);

//ORDER RESULTS BY
// elements.filterLanguages.addEventListener("change", searchView.filterLanguages);
elements.filterLanguages.addEventListener("change", searchView.filters);

//ORDERS RESULTS BY STATUS
elements.orderBy.addEventListener("change", searchView.filters);

//ENTER BUTTON
document.addEventListener("keypress", (event) => {
  //check if the user pressed the return key (enter)
  if (event.keyCode === 13) {
    controlSearch();
  }
});

//X BUTTON
let spanX = document.querySelector(".spanX");
let btn = document.querySelector(".fetch-values");

elements.searchQuery.addEventListener("keyup", disableBtn);

btn.disabled = true;
function disableBtn() {
  if (elements.searchQuery.value.length > 0) {
    spanX.style.opacity = 1;
    spanX.addEventListener("click", () => {
      btn.disabled = true;
      spanX.style.opacity = 0;
      searchView.clearInput();
      searchView.clearResults();
      elements.result.style.display = "none";
    });
    btn.disabled = false;
  } else {
    btn.disabled = true;
    spanX.style.opacity = 0;
    searchView.clearInput();
    searchView.clearResults();
    elements.result.style.display = "none";
  }
}
