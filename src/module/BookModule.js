
import React, { useState, useEffect } from "react";

import BookAPI from "./../apis/BookAPI.js";

import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import Add from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileMove from "@mui/icons-material/DriveFileMove";

function BookModule({ id }) {

  const bookAPI = new BookAPI();

  const [books, setBooks] = useState([]);

  useEffect(() => {
    bookAPI.getAll((data) => {
      setBooks(Array.from(data));
      // loadModule(data);
    });
  });

  return (
    <div id={ id }>
      <Button>
        <Add />
        <h4>Add new book</h4>
      </Button>
      <List>
        {
          books.map(book => 
            <span>
              <ListItem secondaryAction={ 
                <span>
                  <IconButton>
                    <DriveFileMove />
                  </IconButton>
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </span>
              }>
                { book.title }
              </ListItem>
              <Divider />
            </span>)
        }
      </List>
    </div>
  );

}

export default BookModule;
