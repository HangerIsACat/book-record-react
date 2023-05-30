

import React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

function FormDialogComponent({ 
  id, 
  frmLabel, 
  isOpen, 
  fields, 
  handlerOk, 
  handlerCancel, 
  handlerClose, 
  handlerChange  
}) {

  return (
    <Dialog id={ id } open={ isOpen } onClose={ handlerClose }>
      <DialogTitle>{ frmLabel }</DialogTitle>
      <DialogContent>
        {
          fields.map(field => 
            <TextField 
              key={ `${ id }-txt-${ field.label.toLowerCase().replaceAll(" ", "") }` } 
              id={ `${ id }-txt-${ field.label.toLowerCase().replaceAll(" ", "") }` }
              label={ field.label }
              value={ field.value } 
              onChange={ handlerChange } />
          )
        }
      </DialogContent>
      <DialogActions>
        <Button id="frm-btn-ok" onClick={ handlerOk } >Ok</Button>
        <Button id="frm-btn-cancel" onClick={ handlerCancel } >Cancel</Button>
      </DialogActions>
    </Dialog>
  );

}

export default FormDialogComponent;
