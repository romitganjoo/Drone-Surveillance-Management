import React, {useContext} from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Redirect, useHistory } from "react-router";
import {signup} from '../../services/authenticationService';
import { AuthContext } from '../authenticaion/ProvideAuth';
import { Row } from 'react-bootstrap';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Signup() {

  const history = useHistory();

  const [idCreated, setidCreated] = useState(0);
  const authContext = useContext(AuthContext);
  const [persona, setPersona] = useState('');
  const {setUser, setAuthState, updateLocalStorage} = authContext;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    var customer = data.get('customer');
    var droneOwner = data.get('droneOwner');
    var admin = data.get('admin');
    var persona;
    if (customer === 'on') persona = "customer";
    if (droneOwner === 'on') persona = "owner";
    if (admin === 'on') persona = "admin";
    // eslint-disable-next-line no-console
    var data1= {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
      persona:persona,
    };

    console.log(data1);
    const response = await signup(data1);
    if(response.status === 200){
      setUser(response.data);
      setAuthState(true);
      updateLocalStorage(response.data); //Need to call after setUser
      setTimeout(()=>{
        history.push('/login');
      }, 500);
      
    }
    else{
      setAuthState(false);
      console.log('Error', response);
    }
  };

  if(idCreated){
    return <Redirect to="/profile" />
  } else  if (idCreated==="Email ID already exists"){
    return (
    <div> Email ID already exists </div>
  );
  }
  return (
    
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://drive.google.com/file/d/1WKA8pGeAJs167ddh2Lyc9585VAD4Q2dj/view?usp=sharing)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box align='left'>
                <Typography component="h1" variant="h4" >
                  Sign in
                </Typography>
            </Box>

            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <br></br>
            <Grid container spacing={2}>

                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <TextField
                      required
                      id="phoneNumber"
                      name="phoneNumber"
                      label="phoneNumber"
                      fullWidth
                      autoComplete="phone-number"
                    />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>

                <Grid item xs={12}>
                <center>
                <div className="col-sm-6">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="Customer"
                      value="Customer"
                      checked={persona === "Customer"}
                      onChange={(e) => setPersona(e.currentTarget.value)}
                    />
                    <label className="form-check-label">Campus Officer</label>
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    <input
                      className="form-check-input"
                      type="radio"
                      value="Owner"
                      name="Owner"
                      checked={persona === "Owner"}
                      onChange={(e) => setPersona(e.currentTarget.value)}
                    />
                    <label className="form-check-label">Admin</label>
                  </div>
                </div>
                <div xs={12} sm={12}>
                  {persona === "Owner" && (
                    <div className="card">
                      <div className="card-body">
                        <h5>Admin's Personal Details for Registration</h5>
                        <Grid>
                          <Row>

                            <Grid item xs={12} sm={6}>
                              <TextField
                                required
                                id="address1"
                                name="address1"
                                label="Address line 1"
                                fullWidth
                                autoComplete="shipping address-line1"
                                variant="standard"
                              />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                              <TextField
                                required
                                id="city"
                                name="city"
                                label="City"
                                fullWidth
                                autoComplete="shipping address-level2"
                                variant="standard"
                              />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                              <TextField
                                required
                                id="zip"
                                name="zip"
                                label="Zip / Postal code"
                                fullWidth
                                autoComplete="shipping postal-code"
                                variant="standard"
                              />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                              <TextField
                                required
                                id="country"
                                name="country"
                                label="Country"
                                fullWidth
                                autoComplete="shipping country"
                                variant="standard"
                              />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                              <TextField
                                required
                                id="licensenumber"
                                name="licensenumber"
                                label="Admin Id"
                                fullWidth
                                autoComplete="Pilot's License"
                                variant="standard"
                              />
                            </Grid>

                          </Row>

                        </Grid>
                      </div>
                    </div>
                  )}
                </div>

                <div xs={12} sm={12}>
                  {persona === "Customer" && (
                    <div className="card">
                      <div className="card-body">
                        <h5>Campus Officer's Personal Details for Registration</h5>
                        <Grid>
                          <Row>
                            
                            <Grid item xs={12} sm={6}>
                              <TextField
                                required
                                id="address1"
                                name="address1"
                                label="Address line 1"
                                fullWidth
                                autoComplete="shipping address-line1"
                                variant="standard"
                              />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                              <TextField
                                required
                                id="city"
                                name="city"
                                label="City"
                                fullWidth
                                autoComplete="shipping address-level2"
                                variant="standard"
                              />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                              <TextField
                                required
                                id="zip"
                                name="zip"
                                label="Zip / Postal code"
                                fullWidth
                                autoComplete="shipping postal-code"
                                variant="standard"
                              />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                              <TextField
                                required
                                id="country"
                                name="country"
                                label="Country"
                                fullWidth
                                autoComplete="shipping country"
                                variant="standard"
                              />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                              <TextField
                                required
                                id="licensenumber"
                                name="licensenumber"
                                label="Security Officer Id"
                                fullWidth
                                autoComplete="Farming License Number"
                                variant="standard"
                              />
                            </Grid>

                          </Row>

                        </Grid>
                      </div>
                    </div>
                  )}
                </div>
                </center>
              </Grid>
              
              <br></br>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{
                backgroundColor: '#1c3f60'}}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}