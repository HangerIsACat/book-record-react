
export default class LocationAPI {

  constructor() {  };

  async getAllLocations(callback) {
    try {
      const response = await fetch("http://localhost:3001/locations");
      const data = await response.json();

      callback(Array.from(data));
    } catch (error) {
      console.error(error);
    }
  };

  async deleteLocation(location, callback) {
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
