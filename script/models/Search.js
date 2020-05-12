export default class Search {
  constructor(
    _query,
    _language = "en",
    _maxResults = 6,
    _orderBy = "relevance"
  ) {
    this.query = _query;
    this.language = _language;
    this.maxResults = _maxResults;
    this.orderBy = _orderBy;
  }

  async fetchResults() {
    try {
      const API_URL = `https://www.googleapis.com/books/v1/volumes?q=${this.query}&langRestrict=${this.language}&maxResults=${this.maxResults}&orderBy=${this.orderBy}`;
      //console.log(API_URL);
      const response = await fetch(API_URL);
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
  // async filterbyAuthor() {
  //   try {
  //     const response = await fetch(
  //       `https://www.googleapis.com/books/v1/volumes?q=${this.query}+inauthor:${this.author}`
  //     );
  //     const data = await response.json();

  //     this.result = data.items;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}
