//import all DOM queries as elements..
import { DOMstrings as elements } from "./elements.js";

//import Search class
import Search from "./models/Search.js";

//import everything which is public from views as searcView
import * as searchView from "./views.js";

//main function
const controlSearch = async () => {
  try {
    // get the values from the user..
    const query = searchView.getSearchQuery();
    const type = searchView.getSearchType();

    //change the status of the search button..
    elements.fetchBtn.innerHTML = "Searching...";
    elements.fetchBtn.classList.add("spinning");

    /**
     * First we create a new instance of class Search, it will create an object..
     * query = value from the user Input.
     * type = title, author and so on..
     * result = value with the data from GOOGLE BOOKS API
     */
    const search = new Search(query, type);
    console.log(search);

    //get the results from the Google Books API.
    await search.fetchResults();

    //we return the status of our button to normal if the search return something..
    if (search.result) {
      elements.fetchBtn.classList.remove("spinning");
      elements.fetchBtn.innerHTML = "Search";
    }

    //we have now an object called "search" with our data and also the query for use later

    //Prepare the UI for the RESULTS.
    searchView.clearResults();

    //render results on the UI, passing an object inside the function..
    searchView.renderResults(search);
    //console.log(search);

    //clean input
    //searchView.clearInput();
  } catch (error) {
    console.log(error);
  }
};

//EVENTS HANDLER
elements.fetchBtn.addEventListener("click", controlSearch);

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
      document.querySelector(".filters").style.display = "none";
    });
    btn.disabled = false;
  } else {
    spanX.style.opacity = 0;
    searchView.clearResults();
    searchView.clearInput();

    document.querySelector(".filters").style.display = "none";
    btn.disabled = true;
  }
}
