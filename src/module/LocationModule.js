
import React, { useState, useEffect } from "react";

import LocationAPI from "./../apis/LocationAPI.js";

import FormComponent from "./../components/FormComponent.js";
import LocationDialogComponent from "../components/LocationDialogComponent.js"

function LocationModule({ id }) {

  const locationAPI = new LocationAPI();
  
  const [locations, setLocations] = useState([]);
  const [locationFocused, setLocationFocused] = useState({});
  const [locationValue, setLocationValue] = useState("");

  const [inputText, setInputText] = useState("");

  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [inputTextNameEdit, setInputTextNameEdit] = useState("");

  //*
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
    const formData = new URLSearchParams();
    formData.append("name", inputTextNameEdit);
    formData.append("parentID", locationFocused.parentID);

    locationAPI.edit(locationFocused, formData);

    setIsOpenEdit(false);
  }

  function deleteLocation() {
    locationAPI.delete(locationFocused);
    console.log(locationValue);
  }

  function openEditDialog() {
    setIsOpenEdit(true);
    setInputTextNameEdit(locationFocused.name);
  }

  function closeEditDialog() {
    setIsOpenEdit(false);
  }

  function changeTextEditDialog(e) {
    console.log(e.target.value);
    setInputTextNameEdit(e.target.value);
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
        handlerEdit={ openEditDialog } 
        handlerDelete={ deleteLocation } 
      />

      <LocationDialogComponent 
        id="location-dialog" 
        frmLabel="Edit Location" 
        isOpen={ isOpenEdit } 
        frmFieldLabel="Name" 
        frmFieldValue={ inputTextNameEdit }
        handlerOk={ editLocation }
        handlerCancel={ closeEditDialog } 
        handlerClose={ closeEditDialog }
        handlerChange={ changeTextEditDialog } />
    </div>
  );

}

export default LocationModule;
