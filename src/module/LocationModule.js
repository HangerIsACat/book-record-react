
import React, { useState, useEffect } from "react";

import LocationAPI from "./../apis/LocationAPI.js";

import FormComponent from "./../components/FormComponent.js";

function LocationModule({ id }) {

  const locationAPI = new LocationAPI();
  
  const [locations, setLocations] = useState([]);
  const [locationFocused, setLocationFocused] = useState({});
  const [locationValue, setLocationValue] = useState("");
  const [inputText, setInputText] = useState("");

  /*
  useEffect(() => {
    locationAPI.getAll((data) => {
      setLocations(Array.from(data));
      loadModule(data);
    });
  });
  //*/

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
      setInputText(locationValue);

      let locNames = text.split(" > ");
      let locNameLast = locNames[locNames.length - 1];
      let locValue = locations.find(location => location.name == locNameLast);
      setLocationFocused(locValue);
    }
  }

  function addLocation() {
    console.log(`Add text: ${locationFocused.name}`);
    // locationAPI.add(text);
  }

  function editLocation() {
    console.log(`Edit text: ${locationFocused.name}`);
    // locationAPI.edit(text);
  }

  function deleteLocation() {
    locationAPI.delete(locationFocused);
    console.log(locationValue);
  }

  function focusInput(e) {
    console.log("Focus");
    // setInputText(locationFocused.name);
    setInputText("Focus");
    console.log(locationValue);
    console.log(locationFocused);
  }

  function blurInput(e) {
    console.log("Blur");
    // setInputText(locationValue)
    setInputText("Blur");
    console.log(locationValue);
    console.log(locationFocused);
  }

  function changeInput(e) {
    console.log("Change");
    setInputText(e.target.value);
  }

  return (
    <div id={ id }>
      <h3>Locations</h3>
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
        valueTxt={ inputText } 
        handlerAdd={ addLocation } 
        handlerEdit={ editLocation } 
        handlerDelete={ deleteLocation } 
        handlerBlur={ blurInput } 
        handlerFocus={ focusInput } 
        handlerChange={ changeInput }
      />
    </div>
  );

}

export default LocationModule;
