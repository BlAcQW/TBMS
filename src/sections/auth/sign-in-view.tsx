// import { useState, useCallback } from 'react';

// import Box from '@mui/material/Box';
// import Link from '@mui/material/Link';
// import Divider from '@mui/material/Divider';
// import TextField from '@mui/material/TextField';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import LoadingButton from '@mui/lab/LoadingButton';
// import InputAdornment from '@mui/material/InputAdornment';

// import { useRouter } from 'src/routes/hooks';
// import { Link as RouterLink } from 'react-router-dom';

// import { Iconify } from 'src/components/iconify';
// import { toast } from 'react-toastify'; // Add this for toasts
// import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
// import axios from 'axios';

// // ----------------------------------------------------------------------

// export function SignInView() {
//   const router = useRouter();

//   const [showPassword, setShowPassword] = useState(false);
//   const [username, setUsername] = useState(''); // Controlled state for email
//   const [password, setPassword] = useState(''); // Controlled state for password
//   const [isLoading, setIsLoading] = useState(false); // Loading state
//   const [loginToken, setLoginToken] = useState<string | null>(null);


//   const handleSignIn = useCallback(async () => {
//     setIsLoading(true); // Show loading state
//     try {
//       const response = await axios.post('http://15.236.117.108/tbms_rest_api/user/login', {
//         username,
//         password,
//       });
//        const res=response.data
//       // Assuming the API response contains `id`, `token`, and `message`
//       const id=res.data.id;
//       const token =res.meta.token
//       const message = res.message
//       if (id && token) {
//         sessionStorage.setItem('id', id); // Store id in sessionStorage
//         sessionStorage.setItem('token', token); // Store token in sessionStorage
//         toast.success(message || 'Sign-in successful!'); // Show success toast
//         router.push('/account'); // Redirect to account page
//       } else {
//         toast.error(message || 'Failed to sign in. Please try again.');
//       }
//     } catch (error: any) {
//       toast.error(
//         error.response?.data?.message || 'An error occurred while signing in. Please try again.'
//       ); // Show error toast
//     } finally {
//       setIsLoading(false); // Hide loading state
//     }
//   }, [username, password, router]);

//   const renderForm = (
//     <Box display="flex" flexDirection="column" alignItems="flex-end">
//       <TextField
//         fullWidth
//         name="username"
//         label="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         InputLabelProps={{ shrink: true }}
//         sx={{ mb: 3 }}
//       />

//       <Link variant="body2" color="inherit" sx={{ mb: 1.5 }}>
//         Forgot password?
//       </Link>

//       <TextField
//         fullWidth
//         name="password"
//         label="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         InputLabelProps={{ shrink: true }}
//         type={showPassword ? 'text' : 'password'}
//         InputProps={{
//           endAdornment: (
//             <InputAdornment position="end">
//               <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
//                 <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
//               </IconButton>
//             </InputAdornment>
//           ),
//         }}
//         sx={{ mb: 3 }}
//       />

//       <LoadingButton
//         fullWidth
//         size="large"
//         type="submit"
//         color="inherit"
//         variant="contained"
//         onClick={handleSignIn}
//         loading={isLoading} // Show spinner when loading
//       >
//         Sign in
//       </LoadingButton>
//     </Box>
//   );

//   return (
//     <>
//       <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
//         <Typography variant="h5">Sign in</Typography>
//         <Typography variant="body2" color="text.secondary">
//           Don’t have an account?
//           <Link variant="subtitle2" sx={{ ml: 0.5 }} component={RouterLink} to="/signup">
//             Get started
//           </Link>
//         </Typography>
//       </Box>

//       {renderForm}

//       <Divider sx={{ my: 3, '&::before, &::after': { borderTopStyle: 'dashed' } }}>
//         <Typography
//           variant="overline"
//           sx={{ color: 'text.secondary', fontWeight: 'fontWeightMedium' }}
//         >
//           OR
//         </Typography>
//       </Divider>

//       <Box gap={1} display="flex" justifyContent="center">
//         <IconButton color="inherit">
//           <Iconify icon="logos:google-icon" />
//         </IconButton>
//         <IconButton color="inherit">
//           <Iconify icon="eva:github-fill" />
//         </IconButton>
//         <IconButton color="inherit">
//           <Iconify icon="ri:twitter-x-fill" />
//         </IconButton>
//       </Box>
//     </>
//   );
// }


import { useState, useCallback, useEffect } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';
import { Link as RouterLink } from 'react-router-dom';

import { Iconify } from 'src/components/iconify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export function SignInView() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://15.236.117.108/tbms_rest_api/user/login', {
        username,
        password,
      });

      const res = response.data;
      const id = res.data.id;
      const token = res.meta.token;
      const timeout = res.meta.timeout; // Get the timeout (in seconds)
      const message = res.message;

      if (id && token) {
        // Store the token, id, and expiration time in sessionStorage
        sessionStorage.setItem('id', id);
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('expiration', `${Date.now() + timeout * 1000}`); // Convert to ms
        toast.success(message || 'Sign-in successful!');
        router.push('/account');

        // Set a timeout to handle token expiration
        setTimeout(() => {
          handleLogout();
        }, timeout * 1000);
      } else {
        toast.error(message || 'Failed to sign in. Please try again.');
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || 'An error occurred while signing in. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  }, [username, password, router]);

  // Handle user logout
  const handleLogout = useCallback(() => {
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('expiration');
    toast.info('Session expired. Please log in again.');
    router.push('/signin'); // Redirect to sign-in page
  }, [router]);

  // Automatically check for token expiration on component mount
  useEffect(() => {
    const expiration = sessionStorage.getItem('expiration');
    if (expiration && Date.now() > parseInt(expiration, 10)) {
      handleLogout(); // Log out if the token is already expired
    }
  }, [handleLogout]);

  const renderForm = (
    <Box display="flex" flexDirection="column" alignItems="flex-end">
      <TextField
        fullWidth
        name="username"
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 3 }}
      />

      <Link variant="body2" color="inherit" sx={{ mb: 1.5 }}>
        Forgot password?
      </Link>

      <TextField
        fullWidth
        name="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        InputLabelProps={{ shrink: true }}
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ mb: 3 }}
      />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
        onClick={handleSignIn}
        loading={isLoading}
      >
        Sign in
      </LoadingButton>
    </Box>
  );

  return (
    <>
      <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
        <Typography variant="h5">Sign in</Typography>
        <Typography variant="body2" color="text.secondary">
          Don’t have an account?
          <Link variant="subtitle2" sx={{ ml: 0.5 }} component={RouterLink} to="/signup">
            Get started
          </Link>
        </Typography>
      </Box>

      {renderForm}

      <Divider sx={{ my: 3, '&::before, &::after': { borderTopStyle: 'dashed' } }}>
        <Typography
          variant="overline"
          sx={{ color: 'text.secondary', fontWeight: 'fontWeightMedium' }}
        >
          OR
        </Typography>
      </Divider>

      <Box gap={1} display="flex" justifyContent="center">
        <IconButton color="inherit">
          <Iconify icon="logos:google-icon" />
        </IconButton>
        <IconButton color="inherit">
          <Iconify icon="eva:github-fill" />
        </IconButton>
        <IconButton color="inherit">
          <Iconify icon="ri:twitter-x-fill" />
        </IconButton>
      </Box>
    </>
  );
}


