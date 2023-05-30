
import React, { useState, useEffect } from "react";

import BookAPI from "./../apis/BookAPI.js";

import FormDialogComponent from "./../components/FormDialogComponent.js";
import ListComponent from "./../components/ListComponent.js";

import Button from "@mui/material/Button";
import Add from "@mui/icons-material/Add";

function BookModule({ id }) {

  const bookAPI = new BookAPI();

  const [books, setBooks] = useState([]);

  const [items, setItems] = useState([]);
  const [itemSelected, setItemSelected] = useState({});
  const [locCurrentTxt, setLocCurrentTxt] = useState("");

  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [dialogFields, setDialogFields] = useState([]);
  const [inputTextTitleAdd, setInputTitleNameAdd] = useState("");

  useEffect(() => {
    bookAPI.getAll((data) => {
      setBooks(Array.from(data));
      loadModule(data);
    });
  });

  function loadModule(books) {
    const location = document.getElementById("frm-text").value;
    const locationArr = location.split(" > ");
    const locCurrent = locationArr[locationArr.length - 1];

    setLocCurrentTxt(location.replaceAll(" > ", "/",));

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
    const book = books.find(book => book.id = itemSelected.id);
    bookAPI.delete(book);
  }

  function focusItem(item) {
    setItemSelected(item);
  }

  function openAddDialog() {
    setIsOpenAdd(true);
  }

  function closeAddDialog() {
    setIsOpenAdd(false);
  }

  function changeTextOpenDialog(e) {
    console.log(e.target.value);
    setInputTitleNameAdd(e.target.value);
  }

  return (
    <div id={ id }>
      <Button onClick={ openAddDialog }>
        <Add />
        <h4>Add new book</h4>
      </Button>
    <ListComponent id="book-list" items={ items } handlerDelete={ deleteBook } handlerFocus={ focusItem } />   

    <FormDialogComponent 
        id="book-dialog-add" 
        frmLabel="Add Book" 
        isOpen={ isOpenAdd } 
        fields={ dialogFields } 
        handlerOk={ addBook }
        handlerCancel={ closeAddDialog } 
        handlerClose={ closeAddDialog }
        handlerChange={ changeTextOpenDialog } />   
    </div>
  );

}

export default BookModule;
