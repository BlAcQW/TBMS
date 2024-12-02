import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Badge,
} from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';
import moment from 'moment';
import CreateAccount from './CreateAccount';
import ViewAccount from './View-account';
import UpdateAccount from './UpdateAccount';

// Mock data
const mockData = [
  {
    id: 1,
    region: 'Region A',
    district: 'District 1',
    vendorPointName: 'Vendor 1',
    perLitre: 120.5,
    effectiveDate: moment().subtract(2, 'days').toISOString(),
    createdBy: 'user1@example.com',
    createdAt: moment().subtract(5, 'days').toISOString(),
  },
  {
    id: 2,
    region: 'Region B',
    district: 'District 2',
    vendorPointName: 'Vendor 2',
    perLitre: 130.0,
    effectiveDate: moment().add(5, 'days').toISOString(),
    createdBy: 'user2@example.com',
    createdAt: moment().subtract(10, 'days').toISOString(),
  },
];

export default function AccountTable() {
  const [data, setData] = useState(mockData);

  // Mock refresh function
  const handleRefresh = () => {
    console.log('Data refreshed');
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
        <Typography variant="h5" fontWeight="bold">
          Account
        </Typography>
        <Box display='flex'>
          <CreateAccount/>

          <Button
            variant="contained"
            color="primary"
            onClick={handleRefresh}
            startIcon={<RefreshIcon />}
          >
            Refresh
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Action</TableCell>
              <TableCell>Per Litre</TableCell>
              <TableCell>Region</TableCell>
              <TableCell>District</TableCell>
              <TableCell>Vendor Point Name</TableCell>
              <TableCell>Effective Date</TableCell>
              <TableCell>Created By</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <IconButton color="primary" ><ViewAccount/> </IconButton>
                  <IconButton color='primary'> <UpdateAccount/></IconButton>
                </TableCell>
                <TableCell>{row.perLitre}</TableCell>
                <TableCell>{row.region}</TableCell>
                <TableCell>{row.district}</TableCell>
                <TableCell>{row.vendorPointName}</TableCell>
                <TableCell>{moment(row.effectiveDate).format('MMM Do YYYY')}</TableCell>
                <TableCell>{row.createdBy}</TableCell>
                <TableCell>{moment(row.createdAt).format('MMM Do YYYY')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
