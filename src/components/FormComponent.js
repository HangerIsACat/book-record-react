
import React from "react";

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import InputLabel from "@mui/material/InputLabel";

function FormComponent({ 
  id, 
  frmLabel, 
  valueTxt, 
  handlerAdd, 
  handlerEdit, 
  handlerDelete, 
  handlerFocus, 
  handlerBlur, 
  handlerChange 
}) {

  return (
    <Paper id={ id } component="form" 
      sx={{ 
        p: "2px 4px", 
        display: "flex", 
        position: "relative", 
        alignItems: "center", 
        bgcolor: "#509ce7", 
        width: 750 }}>
      <InputLabel id="frm-lbl" htmlFor="frm-text">
        { frmLabel }
      </InputLabel>
      <InputBase 
        id="frm-text" 
        label={ frmLabel } 
        value={ valueTxt } 
        variant="outlined" 
        sx={{ ml: 1, flex: 1, position: "relative" }} 
        onFocus={ handlerFocus } 
        onBlur={ handlerBlur } 
        onChange={ handlerChange } 
      />
      <ButtonGroup id="frm-btngrp" disableElevation variant="contained">
        <Button id="frm-btn-add" onClick={ handlerAdd } >Add</Button>
        <Button id="frm-btn-edit" onClick={ handlerEdit } >Edit</Button>
        <Button id="frm-btn-delete" onClick={ handlerDelete } >Delete</Button>
      </ButtonGroup> 
    </Paper>
  );

}

export default FormComponent;
