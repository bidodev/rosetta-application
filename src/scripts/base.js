// -----------------------------------------------------------------------------
// This file contains functions, elements in general which are statics.
// For example DOMString, layout componenets (navbar, loaders, goUp button)
// Dinamynic things which general return or manipulate data, should be put inside views
// -----------------------------------------------------------------------------

export const elements = {
  searchQuery: document.querySelector(".search-field"),
  orderBy: document.querySelector(".order-by"),
  searchType: document.querySelector(".select-type"),
  booksContainer: document.querySelector(".container-books"),
  result: document.querySelector(".result"),
  fetchBtn: document.querySelector(".fetch-values"),
  filterLanguages: document.querySelector(".search-languages"),
  container: document.querySelector(".container"),
  filters: document.querySelector(".filters"),
  buttonUp: document.querySelector(".button_up"),
  searchHeader: document.getElementById("header"),
  spanx: document.querySelector(".spanX"),
  navbar: document.querySelector(".header-nav"),
};

export const elementsStr = {
  loader: "loader",
};

//insert the spinner loader..
export const renderSpinner = (parent, where) => {
  const loader = `
  <div class="${elementsStr.loader}">
    <svg>
      <use href="img/icons.svg#icon-cw"></use>
    </svg>
  </div>`;
  parent.insertAdjacentHTML(where, loader);
  /** element.insertAdjacentHTML(position, text);
   * Parameters
   * 
      position
        A DOMString representing the position relative to the element; must be one of the following strings:
          'beforebegin': Before the element itself.
          'afterbegin': Just inside the element, before its first child.
          'beforeend': Just inside the element, after its last child.
          'afterend': After the element itself
      text
        The string to be parsed as HTML or XML and inserted into the tree.
   */
};

export const removeSpinner = function () {
  const loader = document.querySelector(`.${elementsStr.loader}`);
  if (loader) {
    loader.remove();
  }
};

export const fixedNav = function () {
  this.scrollY > this.innerHeight / 1
    ? elements.navbar.classList.add("fixed-top")
    : //add bootstrap fixed-top class
      elements.navbar.classList.remove("fixed-top");
};

export const disableBtn = function () {
  if (elements.searchQuery.value.length > 0) {
    elements.spanx.style.opacity = 1;
    elements.spanx.addEventListener("click", () => {
      elements.fetchBtn.disabled = true;
      elements.spanx.style.opacity = 0;
      searchView.clearInput();
      searchView.clearResults();
      elements.result.style.display = "none";
    });
    elements.fetchBtn.disabled = false;
  } else {
    elements.fetchBtn.disabled = true;
    elements.spanx.style.opacity = 0;
    searchView.clearInput();
    searchView.clearResults();
    elements.result.style.display = "none";
  }
};
