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

      this.result = data;
    } catch (error) {
      console.log(error);
    }
  }
}
