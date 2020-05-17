import { elements, configs } from "../base.js";
import { noCover } from "../config.js";
import { state } from "../app.js";

//import Search class
import Book from "../models/Book.js";

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

//controller display results
export const displayResults = () => {
  console.log(state.search);
  //get the array of books from state
  const { result } = state.search;

  //save the status of the currentPage for the pagination.
  state.currentPage = 1;

  //show the whole main ()
  elements.main.style.display = "block";

  //generate the dinamic content
  displayList(result, elements.booksContainer, configs.rows, state.currentPage);
  setupPagination(result, elements.pagination, configs.rows);
};

// __________________ settting page numbers ______________________________________//
function setupPagination(items, wrapper, itemsPerPage) {
  wrapper.innerHTML = "";

  let pageCount = Math.ceil(items.length / itemsPerPage); // number of pages depending on the ammount of data from API

  for (let i = 1; i < pageCount + 1; i++) {
    let numberBtn = paginationButton(i, items);
    wrapper.appendChild(numberBtn);
  }
}

//___________________ Generat buttons to represent the number of the pages ______________________________

function paginationButton(page, items) {
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

var modal = document.querySelector(".modal");

async function toggleModal() {
  const id = event.target.parentElement.id;
  state.book = new Book(id);

  await state.book.getBook();
  let {
    title,
    subtitle,
    authors,
    publisher,
    publishedDate,
    description,
    industryIdentifiers,
    pageCount,
    categories,
    imageLinks,
  } = state.book.result;
  document.querySelector(".modal-content").innerHTML = `
  <span class='close-button'>&times;</span>
  
  <h2 class="booktitle">${title}<span class="subtitle">${
    subtitle ? subtitle : ""
  }</span></h2>

  <div class="book-wrapper">
    <div class="bookcover">
      <img
        src="${imageLinks.medium ? imageLinks.medium : noCover}"
        alt="Front Cover"
        title="Front Cover"
      />
    </div>
    <div class="book-wrapper-intern">
      <div class="bookinfo_sectionwrap">
        <div>
          <a href="" class="secondary"
            ><span dir="ltr">${authors}</span></a
          >
        </div>
        <div>
          <span>${publisher}</span>, <span>${publishedDate}</span> -
          <a class="secondary" href=""
            ><span>${categories ? categories[0] : ""}</span></a
          >
          - <span>${pageCount} pages</span>
        </div>
      </div>
      <div class="synopsis">
          <p>${description ? description : "Description not available"}</p>
      </div>
    </div>
  </div>
</div>
  `;
  modal.classList.add("show-modal");
  document.querySelector(".header-nav").classList.add("hidden");
  document
    .querySelector(".close-button")
    .addEventListener("click", windowOnClick);
}

function windowOnClick() {
  modal.classList.remove("show-modal");
  document.querySelector(".header-nav").classList.remove("hidden");
}

// __________________ display the results inside the div _________________________//
function displayList(items, wrapper, itemsPerPage, page) {
  wrapper.innerHTML = "";
  page--;
  let start = itemsPerPage * page; // get the specific amount of item we need in each page
  let end = start + itemsPerPage;
  let paginatedItems = items.slice(start, end); // to get an array out of the displayed items in each page

  paginatedItems.forEach(item => {
    let {
      id,
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
      <div class="book" id ="${id}" >
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
    const box = document.querySelectorAll(".img-box");
    box.forEach(book => {
      book.addEventListener("click", toggleModal);
    });
  });
}
