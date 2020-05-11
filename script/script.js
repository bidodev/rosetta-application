import Search from "./models/Search.js";
import { DOMstrings as elements } from "./elements.js";
import * as searchView from "./views.js";

const controlSearch = async () => {
  // get the query from the user..
  const query = searchView.getInput();

  /**
   * We create a new instance of class Search, this will create an object with 2 properties..
   * query = value from the user Input.
   * result = value with the data from GOOGLE BOOKS API
   */
  const search = new Search(query);

  //fetch the data from the API.
  await search.fetchData();

  //we have now an object called "search" with our data and also the query for use later
  //console.log(search);

  //Prepare the UI for the RESULTS.
  searchView.clearResults();

  //render results on the UI, passing an object inside the function..
  searchView.renderResults(search);
};

elements.fetchBtn.addEventListener("click", controlSearch);
