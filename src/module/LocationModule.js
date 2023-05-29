
import React, { useState, useEffect } from "react";

import LocationAPI from "./../apis/LocationAPI.js"

import FormComponent from "./../components/FormComponent.js";

function LocationModule({ id }) {

  const locationAPI = new LocationAPI();
  
  const [locations, setLocations] = useState([]);
  const [locationFocused, setLocationFocused] = useState([]);
  const [locationValue, setLocationValue] = useState([]);

  function createTree(locations) {
    let locationTree = [];

    if (locations) {
      locations.forEach(location => {
        location.children = locations.filter(
          childLocation => childLocation.parentID == location.id);
        
        if (!location.parentID) {
          locationTree.push(location);
        }
      });
    }

    return locationTree;
  }

  function printNames(text, locNode) {
    text += `${ locNode.name } > `

    if (locNode.children.length != 0) {
      text = printNames(text, locNode.children[0]);

    }

    return text;
  }

  function loadModule(locations) {
    let locationTree = createTree(locations);

    if (locationTree.length != 0) {
      let text = "";
      text = printNames(text, locationTree[0]);
      text = text.slice(0, -3);
      setLocationValue(text);

      let locNames = text.split(" > ");
      let locNameLast = locNames[locNames.length - 1];
      let locValue = locations.find(location => location.name == locNameLast);
      setLocationFocused(locValue);
    }
  }

  useEffect(() => {
    locationAPI.getAll((data) => {
      setLocations(Array.from(data));
      loadModule(data);
    });
  });

  return (
    <div id={ id }>
      <h2>Locations</h2>
      <ul>
        {
          locations.map(location => 
            <li 
              id={ `location-${ location.id }` } 
              key={ location.id } >
                { location.name } : { location.parentID }
            </li>
          )
        }
      </ul>
      <FormComponent 
        id="location-form" 
        frmLabel="Location" 
        valuesAll={ locations } 
        valueFocused={ locationFocused }
        valueTxt={ locationValue } 
        api={ locationAPI }
      />
    </div>
  );

}

export default LocationModule;
