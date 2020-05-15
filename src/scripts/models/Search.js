export default class Search {
  constructor(_filters) {
    let { query, language, type, max, order } = _filters;

    if (query) this.query = query;
    if (language) this.language = language;
    if (type) this.searchType = type;
    if (max) this.maxResults = max;
    if (order) this.orderBy = order;
  }

  async fetchResults() {
    try {
      let baseURL = "https://www.googleapis.com/books/v1/volumes?q=";

      const defSearch = `${encodeURIComponent(this.query)}&langRestrict=${
        this.language
      }&maxResults=32`;

      const filteredSearch = `${this.searchType}:${encodeURIComponent(
        this.query
      )}&langRestrict=${this.language}&maxResults=${this.maxResults}&orderBy=${
        this.orderBy
      }`;

      //check if the search has any filter applied
      this.searchType !== undefined
        ? (baseURL += filteredSearch)
        : (baseURL += defSearch);

      //console.log(baseURL);
      const response = await fetch(baseURL);
      const data = await response.json();

      /**
       * Google will return to us an object with 3 properties..
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
      //console.log(data);
      const extractInfo = res => {
        let { items } = res;

        if (!items) {
          items = [];
        }
        const noCover =
          "https://www.forewordreviews.com/books/covers/strategic-market-research.jpg";

        const validateData = items.map(item => {
          const info = item.volumeInfo;

          let { title, publisher } = info;

          const link = info.previewLink;
          const imgLink = info.imageLinks ? info.imageLinks.thumbnail : noCover;

          //validate authors
          const author =
            info.authors.length > 1
              ? info.authors[0] +
                ` and ${info.authors.length > 2 ? "others" : "other"} ${
                  info.authors.length - 1
                }`
              : info.authors;

          const published = info.publishedDate;

          const description = info.description
            ? info.description
            : "No description available";

          const pageCount = info.pageCount ? info.pageCount : "Unknown";
          // const desc = info.subtitle;

          return {
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

      extractInfo(data);
      //this.result = data.items; //we need just items
    } catch (error) {
      console.log(error);
    }
  }
}
