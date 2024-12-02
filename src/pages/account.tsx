import { Helmet } from 'react-helmet-async';
import AccountTable from 'src/components/account/account-overview';

import { CONFIG } from 'src/config-global';


import { Accountoverview } from 'src/sections/overview/view/account-overview';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Acounts - ${CONFIG.appName}`}</title>
        <meta
          name="description"
          content=""
        />
        <meta name="" content="" />
      </Helmet>

      
      <Accountoverview/>
    </>
  );
}
