export default class Search {
  constructor(query) {
    this.query = query;
  }

  async fetchData() {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${this.query}`
      );
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
