
import React, { useState, useEffect } from "react";

import BookAPI from "./../apis/BookAPI.js";

import ListComponent from "./../components/ListComponent.js";

import Button from "@mui/material/Button";
import Add from "@mui/icons-material/Add";

function BookModule({ id }) {

  const bookAPI = new BookAPI();

  const [books, setBooks] = useState([]);

  const [items, setItems] = useState([]);
  const [itemSelected, setItemSelected] = useState({});

  useEffect(() => {
    bookAPI.getAll((data) => {
      setBooks(Array.from(data));
      loadModule(data);
    });
  });

  function loadModule(books) {
    const locationArr = document.getElementById("frm-text").value.split(" > ");
    const locCurrent = locationArr[locationArr.length - 1];

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
  }

  function deleteBook() {
    const book = books.find(book => book.id = itemSelected.id);
    bookAPI.delete(book);
  }

  function focusItem(item) {
    setItemSelected(item);
  }

  return (
    <div id={ id }>
      <Button>
        <Add />
        <h4>Add new book</h4>
      </Button>
    <ListComponent id="book-list" items={ items } handlerDelete={ deleteBook } handlerFocus={ focusItem } />      
    </div>
  );

}

export default BookModule;
