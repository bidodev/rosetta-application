// -----------------------------------------------------------------------------
// This file contains the whole flow of the application.
// -----------------------------------------------------------------------------

//import HTML elements
import { elements, renderSpinner } from "./base.js";

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
const state = {};

/**
 * Main controller
 */
const controlSearch = async () => {
  try {
    const defSearch = {
      query: searchView.getSearchQuery(), //get the search value from the user
      language: language, //default language for the results
    };
    console.log(defSearch);

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
document.addEventListener("keypress", event => {
  //check if the user pressed the return key (enter)
  if (event.keyCode === 13) {
    controlSearch();
  }
});

// window.onscroll = function () {
//   myFunction();
// };

// const navbar = document.querySelector("navbar");
// const sticky = navbar.offsetTop;

// function myFunction() {
//   window.pageYOffset >= sticky
//     ? navbar.classList.add("fixed-top")
//     : //add bootstrap fixed-top class
//       navbar.classList.remove("fixed-top");
// }

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

elements.buttonUp.addEventListener("click", searchView.goUp);
