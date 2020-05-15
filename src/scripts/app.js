// -----------------------------------------------------------------------------
// This file contains is the controller of the application
// -----------------------------------------------------------------------------

//import base functions and elements
import { elements, fixedNav } from "./base.js";

//import Search class
import Search from "./models/Search.js";

//import everything which is public from views as searcView
import * as searchView from "./views/views.js";

// default language for the results
// Current browser language
// const language = window.navigator.language;
const language = "en";

/**Global state of the application
 * - Search object
 * - Description object
 * - Books object
 */
export const state = {};

/**
 * Main controller
 */
const controlSearch = async () => {
  try {
    const defSearch = {
      query: searchView.getSearchQuery(), //get the search value from the user
      language: language, //default language for the results
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
        searchView.renderResults(state.search);

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

//EVENTS HANDLER
//SEARCH BUTTON
elements.fetchBtn.addEventListener("click", controlSearch);

//GOUP BUTTON
elements.buttonUp.addEventListener("click", searchView.goUp);

//ENTER BUTTON
document.addEventListener("keypress", event => {
  //check if the user pressed the return key (enter)
  if (event.keyCode === 13) {
    controlSearch();
  }
});

//AUTO NAVBAR
window.addEventListener("scroll", fixedNav);

//Disable search (x button)
elements.searchQuery.addEventListener("keyup", searchView.disableSearch);

//EVENTS HANDLER FOR THE FILTERS BUTTONS
//ORDERS RESULTS BY TYPE
const refineSearch = [
  elements.searchType,
  elements.filterLanguages,
  elements.orderBy,
];

refineSearch.forEach(filter => {
  filter.addEventListener("change", searchView.filters);
});
