import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

const defaultTheme = createTheme();

export default function ForgetPassword() {
  const navigate = useNavigate();
  const [otpVisible, setOtpVisible] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [otp, setOtp] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [message, setMessage] = React.useState('');

  const isEmailValid = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const isPhoneValid = (phone) => {
    return /^\d{10}$/.test(phone);
  };

  const isOtpValid = (otp) => {
    return /^\d{6}$/.test(otp);  // Ensure OTP is exactly 6 digits
  };

  const handleGenerateOtp = async () => {
    if (isEmailValid(email) && isPhoneValid(phone)) {
      try {
        const response = await axios.post('http://mlm.edensnews.com:8888/account/generateOtp', {
          email,
          phoneNumber: phone,  // Ensure this matches the API's expected parameter name
        });

        console.log('Full Response:', response.data);

        if (response.data && response.data.success) {
          setMessage(`${response.data.success}`);
          setOtpVisible(true);  // Show OTP fields on success
        } else {
          setMessage('Unexpected response from the server.');
        }
      } catch (error) {
        console.error('Error generating OTP:', error);
        if (error.response) {
          console.log('Response Data:', error.response.data);
          setMessage(`Failed to generate OTP: ${error.response.data.message || 'Unknown error'}`);
        } else if (error.request) {
          console.log('Request Data:', error.request);
          setMessage('No response from the server. Please try again later.');
        } else {
          console.log('Error', error.message);
          setMessage('Failed to generate OTP. Please try again.');
        }
      }
    } else {
      setMessage('Invalid email or phone number');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (otpVisible) {
      if (isOtpValid(otp)) {
        try {
          const response = await axios.post('http://mlm.edensnews.com:8888/account/resetPassword', {
            email,
            newPassword,
            otp,
            phoneNumber: phone
          });

          console.log('Password Reset Response:', response.data);

          if (response.data && response.data.success) {
            alert('Account password has changed successfully.');
            navigate('/sign-in');  // Navigate to sign-in page on success
          } else {
            setMessage('Unexpected response from the server.');
          }
        } catch (error) {
          console.error('Error resetting password:', error);
          if (error.response) {
            console.log('Response Data:', error.response.data);
            setMessage(`Failed to reset password: ${error.response.data.message || 'Unknown error'}`);
          } else if (error.request) {
            console.log('Request Data:', error.request);
            setMessage('No response from the server. Please try again later.');
          } else {
            console.log('Error', error.message);
            setMessage('Failed to reset password. Please try again.');
          }
        }
      } else {
        setMessage('Please enter a valid 6-digit OTP.');
      }
    } else {
      handleGenerateOtp();
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Forgot Password
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!isEmailValid(email) && email.length > 0}
              helperText={!isEmailValid(email) && email.length > 0 ? 'Invalid email address' : ''}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Phone Number"
              name="phone"
              autoComplete="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              error={!isPhoneValid(phone) && phone.length > 0}
              helperText={!isPhoneValid(phone) && phone.length > 0 ? 'Please enter valid phone number' : ''}
              inputProps={{ maxLength: 10 }} // Restricts the input to a maximum of 10 characters
            />
            {!otpVisible && (
              <Button
                type="button"
                fullWidth
                variant="contained"
                onClick={handleGenerateOtp}
                disabled={!isEmailValid(email) || !isPhoneValid(phone) || email.length === 0 || phone.length === 0}
                sx={{ mt: 3, mb: 2 }}
              >
                Generate OTP
              </Button>
            )}
            {otpVisible && (
              <>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="otp"
                  label="OTP"
                  name="otp"
                  autoComplete="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  error={!isOtpValid(otp) && otp.length > 0}
                  helperText={!isOtpValid(otp) && otp.length > 0 ? 'OTP should be 6 digits' : ''}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="newPassword"
                  label="New Password"
                  type="password"
                  id="newPassword"
                  autoComplete="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Reset Password
                </Button>
              </>
            )}
            {message && (
              <Typography variant="body2" color="textSecondary" align="center">
                {message}
              </Typography>
            )}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link onClick={() => navigate('/sign-in')} variant="body2" style={{ cursor: 'pointer' }}>
                  Back to Sign In
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
