// import React, { useState } from 'react';
// import {
//   Box,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   IconButton,
//   Badge,
// } from '@mui/material';
// import { Refresh as RefreshIcon } from '@mui/icons-material';
// import moment from 'moment';
// import CreateApp from './CreateApp';
// import ViewApp from './View-app';
// import UpdateApp from './UpdateApp';

// // Mock data
// const mockData = [
//   {
//     id: 1,
//     region: 'Region A',
//     district: 'District 1',
//     vendorPointName: 'Vendor 1',
//     perLitre: 120.5,
//     effectiveDate: moment().subtract(2, 'days').toISOString(),
//     createdBy: 'user1@example.com',
//     createdAt: moment().subtract(5, 'days').toISOString(),
//   },
//   {
//     id: 2,
//     region: 'Region B',
//     district: 'District 2',
//     vendorPointName: 'Vendor 2',
//     perLitre: 130.0,
//     effectiveDate: moment().add(5, 'days').toISOString(),
//     createdBy: 'user2@example.com',
//     createdAt: moment().subtract(10, 'days').toISOString(),
//   },
// ];

// export default function AppTable() {
//   const [data, setData] = useState(mockData);

//   // Mock refresh function
//   const handleRefresh = () => {
//     console.log('Data refreshed');
//   };

//   return (
//     <Box sx={{ padding: 3 }}>
//       <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
//         <Typography variant="h5" fontWeight="bold">
//           Application
//         </Typography>
//         <Box display='flex'>
//           <CreateApp/>

//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleRefresh}
//             startIcon={<RefreshIcon />}
//           >
//             Refresh
//           </Button>
//         </Box>
//       </Box>

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Action</TableCell>
//               <TableCell>Per Litre</TableCell>
//               <TableCell>Region</TableCell>
//               <TableCell>District</TableCell>
//               <TableCell>Vendor Point Name</TableCell>
//               <TableCell>Effective Date</TableCell>
//               <TableCell>Created By</TableCell>
//               <TableCell>Created At</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {data.map((row) => (
//               <TableRow key={row.id}>
//                 <TableCell>
//                   <IconButton color="primary" ><ViewApp/> </IconButton>
//                   <IconButton color='primary'> <UpdateApp/></IconButton>
//                 </TableCell>
//                 <TableCell>{row.perLitre}</TableCell>
//                 <TableCell>{row.region}</TableCell>
//                 <TableCell>{row.district}</TableCell>
//                 <TableCell>{row.vendorPointName}</TableCell>
//                 <TableCell>{moment(row.effectiveDate).format('MMM Do YYYY')}</TableCell>
//                 <TableCell>{row.createdBy}</TableCell>
//                 <TableCell>{moment(row.createdAt).format('MMM Do YYYY')}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// }


import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';
import moment from 'moment';
import CreateApp from './CreateApp';
import ViewApp from './View-app';
import UpdateApp from './UpdateApp';
import axios from 'axios';

// Define the interface for each data row
interface DataRow {
  accountNumber: string;
  amount: number;
  nextOfKin: string;
  nextOfKinContact: string;
}

// API Url
const API_URL = 'http://15.236.117.108/tbms_rest_api/application/';

export default function AppTable() {
  const [data, setData] = useState<DataRow[]>([]);  // Use the DataRow interface for state
  const [loading, setLoading] = useState(true);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem('token'); // Assuming token is stored in sessionStorage
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data); // Directly set the data from the API response
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Mock refresh function
  const handleRefresh = () => {
    setLoading(true);
    const token = sessionStorage.getItem('token');
    axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setData(response.data); // Directly set the refreshed data
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error refreshing data:', error);
        setLoading(false);
      });
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
        <Typography variant="h5" fontWeight="bold">
          Application
        </Typography>
        <Box display="flex">
          <CreateApp />
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
              <TableCell>Account Number</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Next of Kin</TableCell>
              <TableCell>Next of Kin Contact</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  <IconButton color="primary"><ViewApp /></IconButton>
                  <IconButton color="primary"><UpdateApp /></IconButton>
                </TableCell>
                <TableCell>{row.accountNumber}</TableCell>
                <TableCell>{row.amount}</TableCell>
                <TableCell>{row.nextOfKin}</TableCell>
                <TableCell>{row.nextOfKinContact}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
