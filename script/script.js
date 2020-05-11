import { DOMstrings as elements } from "./elements.js";
import Search from "./models/Search.js";
import * as searchView from "./views.js";

const controlSearch = async () => {
  // get the value from the user..
  const query = searchView.getInput();

  //change the status of the search button..
  elements.fetchBtn.innerHTML = "Content is loading...";
  elements.fetchBtn.classList.add("spinning");

  /**
   * We create a new instance of class Search, this will create an object with 2 properties..
   * query = value from the user Input.
   * result = value with the data from GOOGLE BOOKS API
   */
  const search = new Search(query);

  //fetch the data from the API.
  await search.fetchData();

  //we return the status of our button to normal if the search return something..
  if (search) {
    elements.fetchBtn.classList.remove("spinning");
    elements.fetchBtn.innerHTML = "Search";
  }

  //we have now an object called "search" with our data and also the query for use later

  //Prepare the UI for the RESULTS.
  searchView.clearResults();

  //render results on the UI, passing an object inside the function..
  searchView.renderResults(search);
};

//EVENT HANDLER
elements.fetchBtn.addEventListener("click", controlSearch);
