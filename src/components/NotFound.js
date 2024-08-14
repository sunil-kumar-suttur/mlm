// src/components/NotFound.js

import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const NotFound = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 8,
        }}
      >
        <Typography variant="h1" component="h2" color="textSecondary">
          404
        </Typography>
        <Typography variant="h5" component="h2">
          Page Not Found
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
          The page you are looking for does not exist.
        </Typography>
      </Box>
    </Container>
  );
};

export default NotFound;
