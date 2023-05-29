
import React, { useState, useEffect } from "react";

import LocationAPI from "./apis/LocationAPI.js"

import LocationModule from "./module/LocationModule.js";

function App() {

  const [locations, setLocations] = useState([]);
  const [currentLocation, setCurrentLocation] = useState([]);

  const locationAPI = new LocationAPI();

  useEffect(() => {
    locationAPI.getAllLocations(setLocations);
  }, []);

  return (
    <div>
      <LocationModule id="location-module" locations = { locations } api={ locationAPI } />
    </div>
  );
};

export default App;
