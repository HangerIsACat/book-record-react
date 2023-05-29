
import React, { useState, useEffect } from "react";

import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"
import TextField from "@mui/material/TextField"

function FormComponent({ 
  frmLabel, 
  valuesAll,
  valueFocused, 
  valueTxt, 
  api, 
  id }) {

  // console.log(valuesAll);

  return (
    <form id={ id }>
      <TextField 
        id="frm-text" 
        label={ frmLabel } 
        value={ valueTxt } 
        variant="outlined" 
        fullWidth 
        margin="normal" 
        size="small" 
        InputProps={{ readOnly: true }} 
      /> 
      <ButtonGroup id="frm-btngrp" disableElevation variant="contained">
        <Button id="frm-btn-add" onClick={() =>{ api.add(valueFocused) }} >Add</Button>
        <Button id="frm-btn-edit" onClick={() =>{ api.edit(valueFocused) }} >Edit</Button>
        <Button id="frm-btn-delete" onClick={() =>{ api.delete(valueFocused) }} >Delete</Button>
      </ButtonGroup> 
    </form>
  );

}

export default FormComponent;
