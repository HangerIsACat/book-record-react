
import React, { useState, useEffect } from "react";

import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"
import Paper from "@mui/material/Paper"
import InputBase from "@mui/material/InputBase"
import InputLabel from "@mui/material/InputLabel"

function FormComponent({ 
  frmLabel, 
  valuesAll,
  valueFocused, 
  valueTxt, 
  api, 
  id }) {

  const [inputValue, setInputValue] = useState([]);

  useEffect(() => {
    setInputValue(valueTxt);
  });

  function add() {
    api.add(valueFocused);
  }

  function edit() {
    api.edit(valueFocused);
  }

  function deleteValue() {
    api.delete(valueFocused);
  }  

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
        value={ inputValue } 
        variant="outlined" 
        sx={{ ml: 1, flex: 1, position: "relative" }} 
        onFocus={() => { setInputValue({ value: valueFocused.name }) }} 
        onBlur={() => { setInputValue({ value: valueTxt }) }}
      />
      <ButtonGroup id="frm-btngrp" disableElevation variant="contained">
        <Button id="frm-btn-add" onClick={() =>{ add() }} >Add</Button>
        <Button id="frm-btn-edit" onClick={() =>{ edit() }} >Edit</Button>
        <Button id="frm-btn-delete" onClick={() =>{ deleteValue() }} >Delete</Button>
      </ButtonGroup> 
    </Paper>
  );

}

export default FormComponent;
