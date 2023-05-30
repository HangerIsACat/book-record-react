
import React, { useState, useEffect } from "react";

import LocationModule from "./module/LocationModule.js";

function App() {

  return (
    <div>
      {/* <h2>Records of Books and Their Locations</h2> */}
      <h2>Locations</h2>
      <LocationModule id="location-module" />
    </div>
  );
};

export default App;
