export default class Search {
  constructor(_filters) {
    let { query, language, type, max, order } = _filters;

    this.query = query;
    this.language = language;
    this.searchType = type;
    this.maxResults = max;
    this.orderBy = order;
    console.log(_filters);
  }

  async fetchResults() {
    try {
      let baseURL = "https://www.googleapis.com/books/v1/volumes?q=";

      const defSearch = `${encodeURIComponent(this.query)}&langRestrict=${
        this.language
      }`;

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
      this.result = data.items; //we need just items
    } catch (error) {
      console.log(error);
    }
  }
}
