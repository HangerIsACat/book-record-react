
import React, { useState, useEffect } from "react";

import FormComponent from "./../components/FormComponent.js";

function LocationModule({ locations, id }) {

  function createTree() {
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

  let locationTree = createTree();
  let locationValue = "";

  if (locationTree.length != 0) {
    locationValue = printNames(locationValue, locationTree[0]);
    locationValue = locationValue.slice(0, -3);
  }  

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
        frmValue={ locationTree } 
        frmValueTxt={ locationValue } 
        callbackDelete={ console.log }
      />
    </div>
  );

}

export default LocationModule;
