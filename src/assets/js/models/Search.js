import { configs } from "../configs.js";

export default class Search {
  constructor(filters) {
    let { query, language, type, max, order } = filters;

    if (query) this.query = query;
    if (language) this.language = language;
    if (type) this.searchType = type;
    if (max) this.maxResults = max;
    if (order) this.orderBy = order;
  }

  async fetchResults() {
    try {
      const extractInfo = res => {
        let { items } = res;

        if (!items) {
          items = [];
        }

        //validate the author strings
        const validateAuthor = authors => {
          if (!authors) {
            authors = "Unknown Author";
          } else if (authors.length > 1) {
            return `Authors: ${authors[0]} and more ${authors.length - 1}`;
          }
          return `Author: ${authors}`;
        };

        const validateData = items.map(item => {
          const info = item.volumeInfo;

          const id = item.id;
          const { title, publisher } = info;
          const link = info.previewLink;
          const imgLink = info.imageLinks
            ? info.imageLinks.thumbnail
            : configs.noCover;
          const author = validateAuthor(info.authors);
          //validate authors

          const published = info.publishedDate;

          const description = info.description
            ? info.description
            : "No description available";

          const pageCount = info.pageCount ? info.pageCount : "Unknown";
          // const desc = info.subtitle;

          return {
            id,
            title,
            description,
            link,
            imgLink,
            author,
            publisher,
            published,
            pageCount,
          };
        });

        this.result = validateData;
      };

      const defSearch = `?q=${encodeURIComponent(this.query)}&langRestrict=${
        this.language
      }&maxResults=${this.maxResults}`;

      const filteredSearch = `?q=${this.searchType}:${encodeURIComponent(
        this.query
      )}&langRestrict=${this.language}&maxResults=${this.maxResults}&orderBy=${
        this.orderBy
      }`;

      //check if the search has any filter applied
      let urlAPI = "";

      this.searchType !== undefined
        ? (urlAPI = configs.baseURL + filteredSearch)
        : (urlAPI = configs.baseURL + defSearch);

      //console.log(baseURL);
      const response = await fetch(urlAPI);
      console.log("Search -> fetchResults -> urlAPI", urlAPI);

      const data = await response.json();

      //send the data fo be filtered before return
      console.log(data);
      extractInfo(data);
      /**
       * The API will return to us an object with 3 properties..
       * 
       * {
       *    "kind": "books#volumes",
            "totalItems": 454,
            "items": [
                //it returns an array of objects
            ]
       * }
       * the items properties is the our data, for more informations check docs/example.callapi.json
       */
    } catch (error) {
      console.log(error);
    }
  }
}
