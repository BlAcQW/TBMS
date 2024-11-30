import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  FormControl,
  FormHelperText,
  InputLabel,
  Input,
  Box,
  IconButton,
} from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'; // MUI DatePicker component
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const UpdateRegister = () => {
  const [vendorId, setVendorId] = useState('');
  const [vendorNumber, setVendorNumber] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [district, setDistrict] = useState('');
  const [open, setOpen] = useState(false); // State to manage the open/close of the Dialog
  const [selectedDate, setSelectedDate] = useState(null);

  const handleClickOpen = () => setOpen(true); // Open Dialog
  const handleClose = () => setOpen(false); // Close Dialog

  const handleDateChange = (newDate: any) => {
    setSelectedDate(newDate);
  };

  return (
    <div>
      {/* Button to open Dialog */}
      <IconButton onClick={handleClickOpen}>
        <CreateIcon/>
      </IconButton>

      {/* Material UI Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Update Register</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            {/* Vendor ID */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Vendor ID</InputLabel>
                <Input
                  value={vendorId}
                  onChange={(e) => setVendorId(e.target.value)}
                  placeholder="******"
                />
                <FormHelperText>Required</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Vendor ID</InputLabel>
                <Input
                  value={vendorId}
                  onChange={(e) => setVendorId(e.target.value)}
                  placeholder="******"
                />
                <FormHelperText>Required</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Vendor ID</InputLabel>
                <Input
                  value={vendorId}
                  onChange={(e) => setVendorId(e.target.value)}
                  placeholder="******"
                />
                <FormHelperText>Required</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Vendor ID</InputLabel>
                <Input
                  value={vendorId}
                  onChange={(e) => setVendorId(e.target.value)}
                  placeholder="******"
                />
                <FormHelperText>Required</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Vendor ID</InputLabel>
                <Input
                  value={vendorId}
                  onChange={(e) => setVendorId(e.target.value)}
                  placeholder="******"
                />
                <FormHelperText>Required</FormHelperText>
              </FormControl>
            </Grid>

            {/* Per Litre */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Per Litre</InputLabel>
                <Input
                  value={vendorNumber}
                  onChange={(e) => setVendorNumber(e.target.value)}
                  placeholder="number"
                />
                <FormHelperText>Required</FormHelperText>
              </FormControl>
            </Grid>

            {/* Vendor Name */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Vendor Name</InputLabel>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Name"
                />
                <FormHelperText>Required</FormHelperText>
              </FormControl>
            </Grid>

            {/* Region */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Region</InputLabel>
                <Input
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  placeholder="Region"
                />
                <FormHelperText>Required</FormHelperText>
              </FormControl>
            </Grid>

            {/* District */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>District</InputLabel>
                <Input
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  placeholder="District"
                />
                <FormHelperText>Required</FormHelperText>
              </FormControl>
            </Grid>

            {/* Date Picker */}
           
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              console.log('Account Updated!');
              handleClose();
            }}
            color="primary"
            variant="contained"
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UpdateRegister;
