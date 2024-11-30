import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Grid,
  IconButton,
  useTheme,
  Divider,
} from '@mui/material';
import { Visibility } from '@mui/icons-material';

interface UserData {
  [key: string]: string | number | null;
}

const mockPaymentData: UserData = {
  perLitre: 150,
  quantity: 100,
  amount: 15000,
  desc: "Payment for fuel",
  phone: "1234567890",
  network: "MTN",
  transactionRef: "ABC12345",
  status: "Completed",
  statusReason: "None",
  vendor: "Fuel Vendor",
  createdAt: new Date().toISOString(),
};

const ViewAccount: React.FC = () => {
  const theme = useTheme();

  const [paymentData, setPaymentData] = useState<UserData | null>(mockPaymentData);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const labels: { [key: string]: string } = {
    perLitre: 'Rate',
    quantity: 'Quantity',
    amount: 'Amount',
    desc: 'Description',
    phone: 'Phone',
    network: 'Network',
    transactionRef: 'External Ref',
    status: 'Status',
    statusReason: 'Reason',
    vendor: 'Vendor',
    createdAt: 'Created At',
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const formatValue = (key: string, value: unknown): string => {
    if (value === null || value === undefined) return 'N/A';
    if (key === 'createdAt') {
      const date = new Date(value as string);
      return date.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
    return String(value);
  };

  return (
    <Box>
      <IconButton onClick={handleOpen}>
        <Visibility />
      </IconButton>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Payment Details</DialogTitle>
        <Divider />
        <DialogContent>
          {error ? (
            <Typography color={theme.palette.error.main}>{error}</Typography>
          ) : paymentData ? (
            <Grid container spacing={2}>
              {Object.entries(paymentData).map(
                ([key, value]) =>
                  labels[key] && (
                    <Grid item xs={12} sm={6} key={key}>
                      <TextField
                        label={labels[key] || key}
                        value={formatValue(key, value)}
                        InputProps={{
                          readOnly: true,
                        }}
                        fullWidth
                        variant="outlined"
                        size="small"
                      />
                    </Grid>
                  )
              )}
            </Grid>
          ) : (
            <Typography>No payment details available.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ViewAccount;
