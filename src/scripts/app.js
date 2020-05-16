// -------------------------------------------------------------------------------------------------------------------
// This file contains the controller (Accepts input and converts it to commands for the model or view.)
// -------------------------------------------------------------------------------------------------------------------

//import base functions and elements
import {
  elements,
  configs,
  fixedNav,
  renderSpinner,
  removeSpinner,
} from "./base.js";

//import Search class
import Search from "./models/Search.js";

//import everything which is public from views as searcView
import * as searchView from "./views/views.js";

/**Global state of the application
 * - Search object
 * - Description object
 * - Books object
 */
export const state = {};

/**
 * Search controller
 */
const controlSearch = async () => {
  try {
    const defSearch = {
      query: searchView.getSearchQuery(), //get the search value from the user
      language: configs.defaultLanguage, //default language for the results
      max: configs.maxResults,
    };

    if (defSearch.query) {
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
        searchView.displayResults();

        //jump to the results
        searchView.scrollToResultPage();

        //clear the search input
        searchView.clearInput();
      }
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * FIlters controller
 */
const controlFilters = async () => {
  try {
    //1. Get all the values from the UI to create an object which we're going using to do a new search.
    const filters = {
      query: state.search.query,
      language: elements.filterLanguages.value,
      type: elements.searchType.value,
      max: configs.maxResults,
      order: elements.orderBy.value,
    };

    //2. Clear previous results before update
    searchView.clearResults();

    //3. Sending a new object with all the arguments to perform the search
    state.search = new Search(filters);

    //4. Insert the spinner / loader inside the container after the first child
    renderSpinner(elements.booksContainer, "afterbegin");

    //5. Get the results from the Google Books API
    await state.search.fetchResults();

    //6. Remove the loader from the container
    removeSpinner();

    //7. For each element inside the array call the renderBook function
    searchView.displayResults();
  } catch (error) {
    console.log(error);
  }
};

//EVENTS HANDLER
//SEARCH BUTTON
elements.fetchBtn.addEventListener("click", controlSearch);

//EVENTS HANDLER FOR THE FILTERS BUTTONS
//ORDERS RESULTS BY TYPE
const refineSearch = [
  elements.searchType,
  elements.filterLanguages,
  elements.orderBy,
];

refineSearch.forEach(filter => {
  filter.addEventListener("change", controlFilters);
});

//GOUP BUTTON
elements.buttonUp.addEventListener("click", searchView.goUp);

//AUTO NAVBAR
window.addEventListener("scroll", fixedNav);

//Disable search (x button)
elements.searchQuery.addEventListener("keyup", searchView.disableSearch);

//ENTER BUTTON
document.addEventListener("keypress", event => {
  //check if the user pressed the return key (enter)
  if (event.keyCode === 13) {
    controlSearch();
  }
});
