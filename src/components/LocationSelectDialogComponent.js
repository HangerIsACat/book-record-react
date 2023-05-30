
import React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

function LocationSelectDialogComponent({ 
  id, 
  frmLabel, 
  isOpen, 
  selectValue,
  locValues, 
  handlerOk, 
  handlerCancel, 
  handlerClose, 
  handlerChange  
}) {

  return (
    <Dialog id={ id } open={ isOpen } onClose={ handlerClose }>
      <DialogTitle>{ frmLabel }</DialogTitle>
      <DialogContent>
        <Select id={ `${ id }-cbo` } value={ selectValue } onChange={ handlerChange }>
          {
            locValues.map(locValue => 
              <MenuItem 
                key={ locValue.label } 
                value={ locValue.value }>
                  
                { locValue.label }
              </MenuItem>
            )
          }
        </Select>
      </DialogContent>
      <DialogActions>
        <Button id="frm-btn-ok" onClick={ handlerOk } >Ok</Button>
        <Button id="frm-btn-cancel" onClick={ handlerCancel } >Cancel</Button>
      </DialogActions>
    </Dialog>
  );

}

export default LocationSelectDialogComponent;
