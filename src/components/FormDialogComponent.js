

import React, { useState, useEffect } from "react";

import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

function FormComponent({ 
  frmLabel, 
  valuesAll,
  valueFocused, 
  valueFocusedTxt, 
  valueTxt, 
  api, 
  id }) {

  return (
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
  );

}

export default FormComponent;
