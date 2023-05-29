
import React, { useState, useEffect } from "react";

import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"
import TextField from "@mui/material/TextField"

function FormComponent({ frmLabel, frmValue, frmValueTxt, callbackDelete, id }) {

  console.log(frmValue);

  return (
    <form id={ id }>
      <TextField 
        id="frm-text" 
        label={ frmLabel } 
        value={ frmValueTxt } 
        variant="outlined" 
        fullWidth 
        margin="normal" 
        size="small" 
        InputProps={{ readOnly: true }} 
      /> 
      <ButtonGroup id="frm-btngrp" disableElevation variant="contained">
        <Button id="frm-btn-add">Add</Button>
        <Button id="frm-btn-edit">Edit</Button>
        <Button id="frm-btn-delete" onClick={() => { callbackDelete("Delete")} } >Delete</Button>
      </ButtonGroup> 
    </form>
  );

}

export default FormComponent;
