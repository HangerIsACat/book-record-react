
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

  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [inputTextNameAdd, setInputTextNameAdd] = useState("");

  useEffect(() => {
    locationAPI.getAll((data) => {
      setLocations(Array.from(data));
      loadModule(data);
    });
  });

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
    const formData = new URLSearchParams();
    formData.append("name", inputTextNameAdd);
    formData.append("parentID", locationFocused ? locationFocused.id : null);

    locationAPI.add(formData);

    setIsOpenAdd(false);
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
  }

  function openEditDialog() {
    setIsOpenEdit(true);
    setInputTextNameEdit(locationFocused.name);
  }

  function closeEditDialog() {
    setIsOpenEdit(false);
  }

  function changeTextEditDialog(e) {
    setInputTextNameEdit(e.target.value);
  }

  function openAddDialog() {
    setIsOpenAdd(true);
  }

  function closeAddDialog() {
    setIsOpenAdd(false);
  }

  function changeTextAddDialog(e) {
    setInputTextNameAdd(e.target.value);
  }

  return (
    <div id={ id }>
      <FormComponent 
        id="location-form" 
        frmLabel="Location" 
        valueTxt={ inputText } 
        handlerAdd={ openAddDialog } 
        handlerEdit={ openEditDialog } 
        handlerDelete={ deleteLocation } 
      />

      <LocationDialogComponent 
        id="location-dialog-edit" 
        frmLabel="Edit Location" 
        isOpen={ isOpenEdit } 
        frmFieldLabel="Name" 
        frmFieldValue={ inputTextNameEdit }
        handlerOk={ editLocation }
        handlerCancel={ closeEditDialog } 
        handlerClose={ closeEditDialog }
        handlerChange={ changeTextEditDialog } />

      <LocationDialogComponent 
        id="location-dialog-add" 
        frmLabel="Add Location" 
        isOpen={ isOpenAdd } 
        frmFieldLabel="Name" 
        frmFieldValue={ inputTextNameAdd }
        handlerOk={ addLocation }
        handlerCancel={ closeAddDialog } 
        handlerClose={ closeAddDialog }
        handlerChange={ changeTextAddDialog } />
    </div>
  );

}

export default LocationModule;
