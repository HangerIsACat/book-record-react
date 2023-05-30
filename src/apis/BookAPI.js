
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

  async add(formData, callback) {
    console.log(`Adding book named ${ formData.get("title") } to location ${ formData.get("location") }`);

    try {

      const response = await fetch(
        "http://localhost:3001/book", 
        { 
          method: "POST", 
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }, 
          body: formData 
        });

      const data = await response.text();
      if (data == "Success.") {
        
        if (callback) {
          let newBook = {
            id: null, 
            name: formData.get("title"), 
            parentID: formData.get("location")
          };
          callback(newBook);
        }

        console.log(data);
      }
      
    } catch (error) {
      console.error(error);
    }
  }

  async delete(book, callback) {
    try {

      const response = await fetch(
        `http://localhost:3001/book/${book.id}`, 
        { method: "DELETE" });

      const data = await response.text();
      if (data == "Success.") {
        
        if (callback) {
          callback(book);
        }

        console.log(data);
      }
      
    } catch (error) {
      console.error(error);
    }
  }
}
