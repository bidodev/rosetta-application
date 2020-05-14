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
      }&maxResults=8`;

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

        this.result = items;
      };

      extractInfo(data);
      //this.result = data.items; //we need just items
    } catch (error) {
      console.log(error);
    }
  }
}
