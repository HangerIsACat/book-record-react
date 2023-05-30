
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
    let items = books.map(book => {
      return {
        id: book.id,  
        name: book.title
      };
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
