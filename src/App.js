
import React, { useState, useEffect } from "react";

import LocationModule from "./module/LocationModule.js";
import BookModule from "./module/BookModule.js"

function App() {
  
  return (
    <div>
      <h2>Records of Books and Their Locations</h2>
      <LocationModule id="location-module" />
      <BookModule id="book-module" />
    </div>
  );
};

export default App;
