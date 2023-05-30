
import React, { useState, useEffect } from "react";

import BookAPI from "./../apis/BookAPI.js";

import ListComponent from "./../components/ListComponent.js";
import FormDialogComponent from "./../components/FormDialogComponent.js";
import LocationSelectDialogComponent from "./../components/LocationSelectDialogComponent.js";

import Button from "@mui/material/Button";
import Add from "@mui/icons-material/Add";

function BookModule({ id }) {

  const bookAPI = new BookAPI();

  const [books, setBooks] = useState([]);

  const [items, setItems] = useState([]);
  const [bookSelected, setBookSelected] = useState({});
  const [locCurrentTxt, setLocCurrentTxt] = useState("");

  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [dialogFields, setDialogFields] = useState([]);
  const [inputTextTitleAdd, setInputTitleNameAdd] = useState("");

  const [isOpenSelect, setIsOpenSelect] = useState(false);
  const [locationValues, setLocationValues] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");

  useEffect(() => {
    bookAPI.getAll((data) => {
      setBooks(Array.from(data));
      loadModule(data);
    });
  });

  function loadModule(books) {
    const locString = document.getElementById("frm-text").value;
    const locationArr = locString.split(" > ");
    const locCurrent = locationArr[locationArr.length - 1];

    setLocCurrentTxt(locString.replaceAll(" > ", "/",));

    let items = books.map(book => {
        return {
          id: book.id,  
          name: book.title, 
          location: book.location
        };
    });

    items = items.filter(item => {

      if (item.location.includes(`/${locCurrent}`) 
        && !item.location.includes(`/${locCurrent}/`)) {

        return item;

      } else if (!item.location.includes("/") 
        && item.location.includes(locCurrent)) {
          
        return item;
      }

    });


    const locationValues = [];
    for (let i = 0; i < locationArr.length; i++) {

      locationValues.push({
        label: locationArr[i], 
        value: locationArr.slice(0, i + 1).join("/")
      });

    }
    setLocationValues(locationValues);

    setItems(items);
    setDialogFields([{
      label: "Title", 
      value: inputTextTitleAdd
    }]);
  }

  function addBook() {
    const formData = new URLSearchParams();
    formData.append("title", inputTextTitleAdd);
    formData.append("location", locCurrentTxt);

    bookAPI.add(formData);

    setIsOpenAdd(false);
  }

  function deleteBook() {
    const book = books.find(book => book.id = bookSelected.id);
    bookAPI.delete(book);
  }

  function moveBook() {
    const formData = new URLSearchParams();
    formData.append("location", selectedLocation);

    bookAPI.edit(bookSelected, formData);

    setIsOpenSelect(false);
  }

  function focusItem(item) {
    setBookSelected(item);
  }

  function openAddDialog() {
    setIsOpenAdd(true);
  }

  function closeAddDialog() {
    setIsOpenAdd(false);
  }

  function changeTextOpenDialog(e) {
    setInputTitleNameAdd(e.target.value);
  }

  function openSelectDialog() {
    setIsOpenSelect(true);
  }

  function closeSelectDialog() {
    setIsOpenSelect(false);
  }

  function changeSelectDialog(e) {
    console.log(e.target.value);
    setSelectedLocation(e.target.value);
  }

  return (
    <div id={ id }>
      <Button onClick={ openAddDialog }>
        <Add />
        <h4>Add new book</h4>
      </Button>
    <ListComponent id="book-list" items={ items } handlerDelete={ deleteBook } handlerMove={ openSelectDialog } handlerFocus={ focusItem } />   

    <FormDialogComponent 
        id="book-dialog-add" 
        frmLabel="Add Book" 
        isOpen={ isOpenAdd } 
        fields={ dialogFields } 
        handlerOk={ addBook }
        handlerCancel={ closeAddDialog } 
        handlerClose={ closeAddDialog }
        handlerChange={ changeTextOpenDialog } /> 

    <LocationSelectDialogComponent 
      id="book-locSelector" 
      frmLabel="Move Book" 
      isOpen={ isOpenSelect } 
      selectValue={ selectedLocation } 
      locValues={ locationValues }
      handlerOk={ moveBook } 
      handlerCancel={ closeSelectDialog }
      handlerClose={ closeSelectDialog } 
      handlerChange={ changeSelectDialog }/>
    </div>
  );

}

export default BookModule;
