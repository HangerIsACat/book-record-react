
import React, { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import InputLabel from "@mui/material/InputLabel";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

function FormComponent({ 
  frmLabel, 
  valuesAll,
  valueFocused, 
  valueFocusedTxt, 
  valueTxt, 
  api, 
  id }) {

  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setInputValue(valueTxt);
  });

  function openDialog() {
    setOpen(true);
  }

  function closeDialog() {
    setOpen(false);
  }

  function add(text) {
    console.log(`Add text: ${text}`);
    // api.add(text);
  }

  function edit(text) {
    console.log(`Edit text: ${text}`);
    // api.edit(text);
  }

  function deleteValue() {
    api.delete(valueFocused);
  }

  return (
    <div>
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
      />
      <ButtonGroup id="frm-btngrp" disableElevation variant="contained">
        <Button id="frm-btn-add" onClick={ openDialog } >Add</Button>
        <Button id="frm-btn-edit" onClick={ openDialog } >Edit</Button>
        <Button id="frm-btn-delete" onClick={ deleteValue } >Delete</Button>
      </ButtonGroup> 
    </Paper>

    <Dialog open={ open } onClose={ closeDialog }>
      <DialogTitle>{ frmLabel }</DialogTitle>
      <DialogContent>
        <InputBase 
          autoFocus 
          value={ inputValue } 
          onChange={(e) => { setInputValue(e.target.value) }} />
      </DialogContent>
      <DialogActions>
        <Button id="frm-btn-ok" onClick={() => { add(inputValue) }} >Ok</Button>
        <Button id="frm-btn-cancel" onClick={ closeDialog } >Cancel</Button>
      </DialogActions>
    </Dialog>
    </div>
  );

}

export default FormComponent;
