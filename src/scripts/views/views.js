import Search from "../models/Search.js";
import { elements, configs, renderSpinner, removeSpinner } from "../base.js";
import { state } from "../app.js";

//query input value
export const getSearchQuery = () => elements.searchQuery.value;
export const getSearchType = () => elements.searchType.value;
export const clearInput = () => {
  elements.spanx.style.opacity = 0;
  elements.searchQuery.value = "";
  elements.fetchBtn.disabled = true;
};
export const clearResults = () => (elements.booksContainer.innerHTML = "");

//finction to scroll to the top of the page
export const goUp = () => {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  elements.searchHeader.style.background = "none";
};

export const disableSearch = function () {
  if (elements.searchQuery.value.length > 0) {
    elements.spanx.style.opacity = 1;
    //add event to the x
    elements.spanx.addEventListener("click", () => {
      clearInput();
    });
    elements.fetchBtn.disabled = false;
  } else {
    clearInput();
  }
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

export const renderResults = data => {
  const { result } = data;

  //we make the filters appears again on the page
  document.querySelector(".main-content").style.display = "block";
  elements.result.style.display = "flex";
  displayResults(result);
};

function displayList(items, wrapper, rows_per_page, page) {
  wrapper.innerHTML = "";
  page--;
  let start = rows_per_page * page; // get the specific amount of item we need in each page
  let end = start + rows_per_page;
  let paginatedItems = items.slice(start, end); // to get an array out of the displayed items in each page

  // _________creating a div for each item _________________

  paginatedItems.forEach(item => {
    let {
      title,
      description,
      author,
      pageCount,
      imgLink,
      link,
      published,
      publisher,
    } = item;

    let markUp = `
      <div class="quote">
        <h3>${limitResults(title, 20)}</h3>
        <h6>${author}</h6>
        <h6><span>${pageCount} pages</span></h6>
        <img class="img-box img1" src="${imgLink}" alt="${title}" />
        <p>
        ${limitResults(description, 200)}
        </p>
      </div>
    `;
    elements.booksContainer.insertAdjacentHTML("beforeend", markUp); //   value to display in each div
  });
}

// __________________ setteing page numbers _________________________

function setupPagination(items, wrapper, rows_per_page) {
  wrapper.innerHTML = "";

  let page_count = Math.ceil(items.length / rows_per_page); // number of pages depending on the ammount of data from API

  for (let i = 1; i < page_count + 1; i++) {
    let btn = paginationButton(i, items);
    wrapper.appendChild(btn);
  }
}

//___________________ Generat buttons to represent the number of the pages ______________________________

function paginationButton(page, items) {
  console.log(page, items);
  let button = document.createElement("a");
  button.innerHTML = `<a href="#" class="page">${page}</a>`;

  button.addEventListener("click", e => {
    e.preventDefault();
    state.currentPage = page;
    displayList(
      items,
      elements.booksContainer,
      configs.rows,
      state.currentPage
    );
  });

  return button;
}

/** filters()
 * compose the call to the API
 */
export async function filters() {
  //1. Get all the values from the UI to create an object which we're going using to do a new search.
  const filters = {
    query: state.search.query,
    language: elements.filterLanguages.value,
    type: elements.searchType.value,
    max: configs.maxResults,
    order: elements.orderBy.value,
  };

  //2. Clear previous results before update
  clearResults();

  //3. Sending a new object with all the arguments to perform the search
  const search = new Search(filters);

  //4. Insert the spinner / loader inside the container after the first child
  renderSpinner(elements.booksContainer, "afterbegin");

  //5. Get the results from the Google Books API
  await search.fetchResults();

  //6. Remove the loader from the container
  removeSpinner();

  //7. Destructiring the object
  let { result } = search;

  //8. For each element inside the array call the renderBook function
  displayResults(result);
}

const displayResults = data => {
  //save the status of the currentPage for the pagination.
  state.currentPage = 1;

  //generate smth
  displayList(data, elements.booksContainer, configs.rows, state.currentPage);
  setupPagination(data, elements.pagination, configs.rows);
};
