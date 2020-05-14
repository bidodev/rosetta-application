export const elements = {
  searchQuery: document.querySelector(".search-field"),
  orderBy: document.querySelector(".order-by"),
  searchType: document.querySelector(".select-type"),
  resultDiv: document.querySelector(".container-books"),
  result: document.querySelector(".result"),
  fetchBtn: document.querySelector(".fetch-values"),
  filterLanguages: document.querySelector(".search-languages"),
  container: document.querySelector(".container"),
  filters: document.querySelector(".filters"),
};

//insert the spinner loader..
export const renderSpinner = parent => {
  const loader = `
  <div class="loader">
    <svg>
      <use href="img/icons.svg#icon-cw"></use>
    </svg>
  </div>`;
  parent.insertAdjacentHTML("beforeend", loader);
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
