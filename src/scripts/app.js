//IMPORT BASE / CLASSES / VIEWS //

//import all DOM queries as elements..
import { DOMstrings as elements } from "./elements.js";

//import Search class
import Search from "./models/Search.js";

//import everything which is public from views as searcView
import * as searchView from "./views.js";

//default language for the search
const defaultLanguage = "en";

//MAIN CONTROLLER
const controlSearch = async () => {
  try {
    const defSearch = {
      // get the values from the user..
      query: searchView.getSearchQuery(),
      //default language to search..
      language: defaultLanguage,
    };

    ///const type = searchView.getSearchType();

    //change the status of the search button..
    searchView.addSpinner();

    /**
     * First we create a new instance of class Search, it will create an object..
     * query = value from the user Input.
     * type = title, author and so on..
     * result = value with the data from GOOGLE BOOKS API
     */
    const search = new Search(defSearch);

    //get the results from the Google Books API.
    await search.fetchResults();

    //we return the status of our button to normal if the search return something..
    if (search.result) {
      searchView.removerSpinner();
    }
    //console.log("controlSearch -> search", search);

    //Prepare the UI for the RESULTS.
    searchView.clearResults();

    //time to use our object "search"
    //render results on the UI, passing an object inside the function..
    searchView.renderResults(search);
    console.log(search);
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

//X BUTTON
let spanX = document.querySelector(".spanX");
let btn = document.querySelector(".fetch-values");

elements.searchQuery.addEventListener("keyup", disableBtn);

function disableBtn() {
  if (elements.searchQuery.value.length > 0) {
    spanX.style.opacity = 1;
    spanX.addEventListener("click", () => {
      searchView.clearResults();
      searchView.clearInput();
      elements.result.style.display = "none";
      spanX.style.opacity = 0;
    });
    btn.disabled = false;
  } else {
    spanX.style.opacity = 0;
    searchView.clearResults();
    searchView.clearInput();

    elements.result.style.display = "none";
    btn.disabled = true;
  }
}
