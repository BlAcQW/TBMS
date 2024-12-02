

// import { lazy, Suspense } from 'react';
// import { Outlet, Navigate, useRoutes } from 'react-router-dom';

// import Box from '@mui/material/Box';
// import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

// import { varAlpha } from 'src/theme/styles';
// import { AuthLayout } from 'src/layouts/auth';
// import { DashboardLayout } from 'src/layouts/dashboard';
// import WithAuth from 'src/sections/auth/withAuth';


// // ----------------------------------------------------------------------

// export const HomePage = lazy(() => import('src/pages/home'));
// export const BlogPage = lazy(() => import('src/pages/blog'));
// export const UserPage = lazy(() => import('src/pages/user'));
// export const SignInPage = lazy(() => import('src/pages/sign-in'));
// export const ProductsPage = lazy(() => import('src/pages/products'));
// export const Page404 = lazy(() => import('src/pages/page-not-found'));
// export const Acounts = lazy(() => import('src/pages/account'));
// export const App = lazy(() => import('src/pages/app'));
// export const Register = lazy(() => import('src/pages/registers'));
// export const Message = lazy(() => import('src/pages/messages'));
// export const SignUpPage = lazy(() => import('src/pages/sign-up'));








// // ----------------------------------------------------------------------

// const renderFallback = (
//   <Box display="flex" alignItems="center" justifyContent="center" flex="1 1 auto">
//     <LinearProgress
//       sx={{
//         width: 1,
//         maxWidth: 320,
//         bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
//         [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
//       }}
//     />
//   </Box>
// );

// export function Router() {
//   return useRoutes([
//     // Auth Layout for SignInPage
//     {
//       path: '/',
//       element: (
//         <AuthLayout>
//           <Suspense fallback={renderFallback}>
//             <Outlet />
//           </Suspense>
//         </AuthLayout>
//       ),
//       children: [
//         { element: <SignInPage />, index: true }, // SignInPage is now the default route
//       ],
//     },
    
//     // Dashboard Layout for authenticated routes
//     {
//       element: (
//         <DashboardLayout>
//           <Suspense fallback={renderFallback}>
//             <Outlet />
//           </Suspense>
//         </DashboardLayout>
//       ),
//       children: [
//         { element: <HomePage />, path: 'home' }, // HomePage route
//         { path: 'user', element: <UserPage /> }, // UserPage route
//         { path: 'products', element: <ProductsPage /> }, // ProductsPage route
//         { path: 'blog', element: <BlogPage /> }, // BlogPage route
//         { path: 'account', element: <Acounts/> },  // Account route
//         { path: 'app', element: <App/> },   // Application route 
//         {path :'register' ,element :<Register/> } , // Register route
//         {path :'messages' ,element :<Message/> } , // Register route
        


//       ],
//     },
//     {path :'signup' ,element :(<AuthLayout><SignUpPage/> </AuthLayout>)} , // SignUp Route


//     // 404 page for undefined routes
//     {
//       path: '404',
//       element: <Page404 />,
//     },

//     // Catch-all route for undefined paths, redirect to 404
//     {
//       path: '*',
//       element: <Navigate to="/404" replace />,
//     },
//   ]);
// }

import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { varAlpha } from 'src/theme/styles';
import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';
import WithAuth from 'src/sections/auth/withAuth';

// Lazy load your components
export const HomePage = lazy(() => import('src/pages/home'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const SignInPage = lazy(() => import('src/pages/sign-in'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const Acounts = lazy(() => import('src/pages/account'));
export const App = lazy(() => import('src/pages/app'));
export const Register = lazy(() => import('src/pages/registers'));
export const Message = lazy(() => import('src/pages/messages'));
export const SignUpPage = lazy(() => import('src/pages/sign-up'));

// Loading fallback
const renderFallback = (
  <Box display="flex" alignItems="center" justifyContent="center" flex="1 1 auto">
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

export function Router() {
  return useRoutes([
    // Auth Layout for SignInPage
    {
      path: '/',
      element: (
        <AuthLayout>
          <Suspense fallback={renderFallback}>
            <Outlet />
          </Suspense>
        </AuthLayout>
      ),
      children: [
        { element: <SignInPage />, index: true }, // SignInPage is the default route
      ],
    },

    // Dashboard Layout for authenticated routes
    {
      element: (
        <DashboardLayout>
          <Suspense fallback={renderFallback}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { path: 'home', element: <WithAuth Component={HomePage} /> }, // Protect HomePage
        { path: 'user', element: <WithAuth Component={UserPage} /> }, // Protect UserPage
        { path: 'products', element: <WithAuth Component={ProductsPage} /> }, // Protect ProductsPage
        { path: 'blog', element: <WithAuth Component={BlogPage} /> }, // Protect BlogPage
        { path: 'account', element: <WithAuth Component={Acounts} /> }, // Protect Account route
        { path: 'app', element: <WithAuth Component={App} /> }, // Protect Application route
        { path: 'register', element: <WithAuth Component={Register} /> }, // Protect Register route
        { path: 'messages', element: <WithAuth Component={Message} /> }, // Protect Messages route
      ],
    },

    // SignUp Route
    {
      path: 'signup',
      element: (
        <AuthLayout>
          <SignUpPage />
        </AuthLayout>
      ),
    },

    // 404 page for undefined routes
    {
      path: '404',
      element:<WithAuth Component={Page404} />,
    },

    // Catch-all route for undefined paths, redirect to 404
    // {
    //   path: '*',
    //   element: <Navigate to="/404" replace />,
    // },
  ]);
}
