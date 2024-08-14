import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const SignOut = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Remove user authentication token and any other user-related data
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('accountId'); // Example: remove additional data

    // Log sign out or show a message (optional)
    console.log('User has signed out.');

    // Redirect to sign-in page
    navigate('/signin');
  };

  return (
    <Button variant="contained" color="primary" onClick={handleSignOut}>
      Sign Out
    </Button>
  );
};

export default SignOut;
