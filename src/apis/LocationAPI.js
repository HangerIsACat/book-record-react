
export default class LocationAPI {

  constructor() {  };

  async getAll(callback) {
    try {
      const response = await fetch("http://localhost:3001/locations");
      const data = await response.json();

      if (callback) {
        callback(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  add(locParent) {
    console.log(`Add location to ${locParent.name} : ${locParent.id}`);
  }
  edit(location) {
    console.log(`Edit location ${location.name}`);
  }

  async delete(location, callback) {
    try {

      const response = await fetch(
        `http://localhost:3001/location/${location.id}`, 
        { method: "DELETE" });

      const data = await response.text();
      if (data == "Success.") {
        
        if (callback) {
          callback(location);
        }

        console.log(data);
      }
      
    } catch (error) {
      console.error(error);
    }
  }

}
