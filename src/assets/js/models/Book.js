import { configs } from "../configs.js";
export default class Book {
  constructor(id) {
    this.id = id;
  }

  async getBook() {
    try {
      const result = await fetch(`${configs.baseURL}/${this.id}`);
      const data = await result.json();

      this.result = data.volumeInfo;
    } catch (error) {
      console.log(error);
    }
  }
}
