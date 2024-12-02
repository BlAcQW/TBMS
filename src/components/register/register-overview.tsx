import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { _tasks, _posts, _timeline } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';
import Cardwidget from 'src/sections/overview/cardwidget';
import { ListWidget } from 'src/sections/overview/list-widget';
import { Applist } from '../app/applist';
import { Registerlist } from './register-list';
import NewRegister from './NewRegister';
import RegisterTable from './RegisterTable';





// ----------------------------------------------------------------------

export function Registeroverview() {
  return (
    <DashboardContent maxWidth="xl" sx={{ height: '100vh', overflowY: 'auto' }}>
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Hi, Welcome back 👋 Register
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
        <Cardwidget name='Daily' value='40'/>
         
        </Grid>

        <Grid xs={12} sm={6} md={3}>
        <Cardwidget name='weekly' value='40'/>
        
        </Grid>

        <Grid xs={12} sm={6} md={3}>
        <Cardwidget name='Monthly' value='40'/>
         
        </Grid>

        <Grid xs={12} sm={6} md={3}>
         <Cardwidget name='Yearly' value='40'/>
        </Grid>

       

       
        

        <Grid md={12} lg={12}>
          
          <RegisterTable/>
        </Grid>
       
      </Grid>
    </DashboardContent>
  );
}
