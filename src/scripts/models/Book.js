export default class Book {
  constructor(id) {
    this.id = id;
  }

  async getBook() {
    try {
      const result = await fetch(
        `https://www.googleapis.com/books/v1/volumes/${this.id}`
      );
      const data = await result.json();

      this.result = data.volumeInfo;
    } catch (error) {
      console.log(error);
    }
  }
}
