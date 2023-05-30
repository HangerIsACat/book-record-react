
import React from "react";

import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileMove from "@mui/icons-material/DriveFileMove";

function ListComponent({ 
  id, 
  items, 
  handlerDelete, 
  handlerMove, 
  handlerFocus 
}) {

  return (
    <List id={ id }>
    {
      items.map(item => 
        <ListItem 
          key={ item.id } 
          onFocus={() => { handlerFocus(item); }} 
          divider={ true } 
          data-item-name={ item.name }>

          <ListItemText>{ item.name }</ListItemText>
          <IconButton edge="end" aria-label="move" onClick={ handlerMove }>
            <DriveFileMove />
          </IconButton>
          <IconButton edge="end" aria-label="delete" onClick={ handlerDelete }>
            <DeleteIcon />
          </IconButton>
          
        </ListItem>
      )
    }
    </List>
  );

}

export default ListComponent;
