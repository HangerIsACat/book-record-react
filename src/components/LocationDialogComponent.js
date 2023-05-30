

import React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

function LocationDialogComponent({ 
  id, 
  frmLabel, 
  isOpen, 
  frmFieldLabel, 
  frmFieldValue, 
  handlerOk, 
  handlerCancel, 
  handlerClose, 
  handlerChange  
}) {

  return (
    <Dialog id={ id } open={ isOpen } onClose={ handlerClose }>
      <DialogTitle>{ frmLabel }</DialogTitle>
      <DialogContent>
        <TextField 
          id={ `${ id }-txt-${ frmFieldLabel.toLowerCase().replaceAll(" ", "") }` }
          label={ frmFieldLabel }
          value={ frmFieldValue } 
          onChange={ handlerChange } />
      </DialogContent>
      <DialogActions>
        <Button id="frm-btn-ok" onClick={ handlerOk } >Ok</Button>
        <Button id="frm-btn-cancel" onClick={ handlerCancel } >Cancel</Button>
      </DialogActions>
    </Dialog>
  );

}

export default LocationDialogComponent;
