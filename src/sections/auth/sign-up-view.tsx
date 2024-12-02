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

// // ----------------------------------------------------------------------

// export function SignUpView() {
//   const router = useRouter();

//   const [showPassword, setShowPassword] = useState(false);

//   const handleSignIn = useCallback(() => {
//     router.push('/account');
//   }, [router]);

//   const renderForm = (
//     <Box display="flex" flexDirection="column" alignItems="flex-end">
//         <TextField
//         fullWidth
//         name="name"
//         label="Full Name"
//         defaultValue="Enoch"
//         InputLabelProps={{ shrink: true }}
//         sx={{ mb: 3 }}
//       />
//       <TextField
//         fullWidth
//         name="phone"
//         label="Phone"
//         defaultValue=""
//         InputLabelProps={{ shrink: true }}
//         sx={{ mb: 3 }}
//       />
//       <TextField
//         fullWidth
//         name="email"
//         label="Email address"
//         defaultValue="hello@gmail.com"
//         InputLabelProps={{ shrink: true }}
//         sx={{ mb: 3 }}
//       />

     

//       <TextField
//         fullWidth
//         name="password"
//         label="Password"
//         defaultValue="@demo1234"
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
//       <TextField
//         fullWidth
//         name="password"
//         label="Confirm Password"
//         defaultValue="@demo1234"
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
//       >
//         Create Now
//       </LoadingButton>
//     </Box>
//   );

//   return (
//     <>
//       <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
//         <Typography variant="h5">Sign Up</Typography>
//         <Typography variant="body2" color="text.secondary">
//            Have an account?
//           <Link variant="subtitle2" sx={{ ml: 0.5 }} component={RouterLink} to='/'>
//             Signin Now 
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


import React, { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { useRouter } from 'src/routes/hooks';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';


import { Iconify } from 'src/components/iconify';

export function SignUpView() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });


  const handleSubmit = async () => {
    setLoading(true);

    if (formData.password !== formData.password_confirmation) {
      setToast({ open: true, message: "Passwords don't match", severity: 'error' });
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://15.236.117.108/tbms_rest_api/user/create', {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
        password_confirmation :formData.password_confirmation,

      });
      setToast({ open: true, message: 'Account created successfully!', severity: 'success' });
      router.push('/'); // Navigate to Sign-in page
    } catch (error) {
      setToast({
        open: true,
        message: error.response?.data?.message || 'Failed to create account.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseToast = () => setToast({ ...toast, open: false });

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const renderForm = (
    <Box display="flex" flexDirection="column" alignItems="flex-end">
      <TextField
        fullWidth
        name="name"
        label="Full Name"
        value={formData.name}
        onChange={handleInputChange('name')}
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 3 }}
      />
      <TextField
        fullWidth
        name="phone"
        label="Phone"
        value={formData.phone}
        onChange={handleInputChange('phone')}
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 3 }}
      />
      <TextField
        fullWidth
        name="email"
        label="Email address"
        value={formData.email}
        onChange={handleInputChange('email')}
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 3 }}
      />
      <TextField
        fullWidth
        name="password"
        label="Password"
        value={formData.password}
        onChange={handleInputChange('password')}
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
      <TextField
        fullWidth
        name="password_confirmation"
        label="Confirm Password"
        value={formData.password_confirmation}
        onChange={handleInputChange('password_confirmation')}
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
        loading={loading}
        onClick={handleSubmit}
      >
        Create Now
      </LoadingButton>
    </Box>
  );

  return (
    <>
      <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
        <Typography variant="h5">Sign Up</Typography>
        <Typography variant="body2" color="text.secondary">
          Have an account?
          <Link variant="subtitle2" sx={{ ml: 0.5 }} component={RouterLink} to="/">
            Signin Now
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

      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseToast} severity={toast.severity as any} sx={{ width: '100%' }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </>
  );
}
