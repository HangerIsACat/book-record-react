
export default class BookAPI {

  constructor() { }

  async getAll(callback) {
    try {
      const response = await fetch("http://localhost:3001/books");
      const data = await response.json();

      if (callback) {
        callback(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

}
