import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Grid, Box, Container, IconButton, Menu, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logo from '../images/EDENS_LOGO_PNG_new-removebg-preview.png';

const Header = ({ accountId }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    // Close the menu whenever the route changes
    setAnchorEl(null);
  }, [location.pathname]);

  const handleSignOut = () => {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('id'); 
    navigate('/sign-in');
  };

  const handleChangePassword = () => {
    navigate('/change-password', { state: { accountId } });
    handleClose();
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Check if the current path is the dashboard
  const isProfileVisible = location.pathname === '/dashboard';

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', width: '100%', padding: '10px 0', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <Container maxWidth="xl" sx={{ maxWidth: '1200px', margin: '0 auto', paddingLeft: { xs: '16px', sm: '24px' }, paddingRight: { xs: '16px', sm: '24px' } }}>
        <Grid container alignItems="center">
          <Grid item xs={6} sm={4}>
            <img src={logo} alt="Logo" style={{ height: '100px', maxWidth: '100%' }} />
          </Grid>
          <Grid item xs={6} sm={8} container justifyContent="flex-end" alignItems="center">
            {isProfileVisible && (
              <>
                <IconButton 
                  edge="end" 
                  color="inherit" 
                  onClick={handleMenu} 
                  sx={{ marginLeft: 'auto', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.08)' } }}>
                  <AccountCircleIcon sx={{ fontSize: '40px', color: '#1976d2' }} />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  sx={{ '& .MuiPaper-root': { backgroundColor: '#fff', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', borderRadius: '8px', padding: '10px', minWidth: '200px' } }}
                >
                  <MenuItem 
                    onClick={handleChangePassword} 
                    sx={{ '&:hover': { backgroundColor: '#1976d2', color: '#fff' } }}>
                    Change Password
                  </MenuItem>
                  <MenuItem 
                    onClick={handleSignOut} 
                    sx={{ '&:hover': { backgroundColor: '#1976d2', color: '#fff' } }}>
                    Sign Out
                  </MenuItem>
                </Menu>
              </>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Header;
