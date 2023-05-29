
import React, { useState, useEffect } from "react";
import LocationModule from "./module/LocationModule.js";

function App() {

  const [locations, setLocations] = useState([]);
  const [currentLocation, setCurrentLocation] = useState([]);

  async function getAllLocations() {
    try {
      const response = await fetch("http://localhost:3001/locations");
      const data = await response.json();

      setLocations(Array.from(data));
    } catch (error) {
      console.error(error);
    }
  };

  async function deleteLocation(locForDelete) {
    
    try {
      const response = await fetch(
        `http://localhost:3001/location/${locForDelete.id}`, 
        { method: "DELETE" });

      const data = await response.text();
      if (data == "Success.") {
        // TODO: message
        console.log(data);
      }
      
    } catch (error) {
      console.error(error);
    }

  }

  useEffect(() => {
    getAllLocations();
  }, []);

  return (
    <div>
      <LocationModule id="location-module" locations = { locations } />
    </div>
  );
};

export default App;
