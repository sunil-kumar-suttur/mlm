import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid, Typography, Box, Button, CardContent, Paper, IconButton } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [data, setData] = useState({
    id: '',
    level: 1,
    balance: 0,
    references: 0,
    referralCode: '',
    enableWithdraw: false,
    accountVerified: false
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    const accountId = sessionStorage.getItem('accountId');

    if (!token || !accountId) {
      navigate('/sign-in');
    } else {
      axios.get(`http://mlm.edensnews.com:8888/account/dashboard?accountId=${accountId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then(response => {
          setData({
            id: response.data.id,
            level: response.data.level,
            balance: response.data.amount,
            references: response.data.peopleUnder,
            referralCode: response.data.referralCode,
            enableWithdraw: response.data.enableWithdraw,
            accountVerified: response.data.accountVerified
          });
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    return () => {
      sessionStorage.clear(); // Clear all items in local storage when navigating away
    };
  }, [navigate]);

  const handleWithdraw = () => {
    alert('Withdraw button clicked!');
  };

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  return (
    <Container className="dashboard-root">
      <Grid container spacing={3}>
        {/* Dashboard Cards */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} className="dashboard-card">
            <CardContent>
              <Typography variant="h6">My Level</Typography>
              <Typography variant="h5">{data.level}</Typography>
            </CardContent>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} className="dashboard-card">
            <CardContent>
              <Typography variant="h6">Available Balance</Typography>
              <Typography className="balance-text">₹{data.balance}</Typography>
              <Button
                className="withdraw-button"
                variant="contained"
                onClick={handleWithdraw}
                disabled={!data.enableWithdraw}
              >
                Withdraw
              </Button>
            </CardContent>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} className="dashboard-card">
            <CardContent>
              <Typography variant="h6">My Referral Code</Typography>
              <Box className="referral-code-box">
                <Typography className="referral-code-text">
                  {data.referralCode}
                </Typography>
                <IconButton onClick={() => navigator.clipboard.writeText(data.referralCode)} color="primary">
                  <FileCopyIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} className="dashboard-card">
            <CardContent>
              <Typography variant="h6">My Referrals</Typography>
              <Typography variant="h5">{data.references}</Typography>
            </CardContent>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} className="dashboard-card">
            <CardContent>
              <Typography variant="h6">Account Verification Status</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {data.accountVerified ? (
                  <CheckCircleIcon sx={{ color: 'green', mr: 1 }} />
                ) : (
                  <CancelIcon sx={{ color: 'red', mr: 1 }} />
                )}
                <Typography variant="h5">{data.accountVerified ? 'Verified' : 'Not Verified'}</Typography>
              </Box>
            </CardContent>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
