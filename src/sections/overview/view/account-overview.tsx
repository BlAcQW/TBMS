import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { _tasks, _posts, _timeline } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';
import CreateAccount  from 'src/components/account/CreateAccount';


import { AnalyticsNews } from '../analytics-news';
import { AnalyticsTasks } from '../analytics-tasks';
import { AnalyticsCurrentVisits } from '../analytics-current-visits';
import { AnalyticsOrderTimeline } from '../analytics-order-timeline';
import { AnalyticsWebsiteVisits } from '../analytics-website-visits';
import { AnalyticsWidgetSummary } from '../analytics-widget-summary';
import { AnalyticsTrafficBySite } from '../analytics-traffic-by-site';
import { AnalyticsCurrentSubject } from '../analytics-current-subject';
import { AnalyticsConversionRates } from '../analytics-conversion-rates';
import Cardwidget from '../cardwidget';
import { ListWidget } from '../list-widget';
import AccountTable from 'src/components/account/account-overview';

// ----------------------------------------------------------------------

export function Accountoverview() {
  return (
    <DashboardContent maxWidth="xl" >
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Hi, Welcome back 👋
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
        <AccountTable/>
          
          
        </Grid>
        
      </Grid>
    </DashboardContent>
  );
}
