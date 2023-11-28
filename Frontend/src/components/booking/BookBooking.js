import React, {useContext, useState} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FindSourceAndDestination from './findSourceAndDestination';
import BookingList from '../drone/DroneList';
import ReviewBooking from './ReviewBooking';
import Payment from './Payment';
import {bookBooking} from '../../services/bookingService';
import { AuthContext } from '../authenticaion/ProvideAuth';
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['Select the area, date and time', 'Select the drone', 'Confirm the booking','Payment'];




const theme = createTheme();

export default function BookBooking() {
  const [activeStep, setActiveStep] = useState(0);
  const [booking, setBooking] = useState();
  const [loading, setLoading] = useState();
  const authContext = useContext(AuthContext);
  const {user} = authContext;
  const handleNext = async () => {
    setActiveStep(activeStep + 1);
    if(activeStep == 2){
      const resp = await bookBooking(booking, user);
      if(resp.status === 200){
        setBooking(resp.data.payload);
        setLoading(false);
      }
      else{
        console.log('Error Occured');
      }
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <FindSourceAndDestination 
                  setBooking={setBooking}
                  booking={booking}
              />;
      case 1:
        return <BookingList 
                  setBooking={setBooking}
                  booking={booking}
                />;
      case 2:
        return <ReviewBooking 
                  setBooking={setBooking}
                  booking={booking}
                />;
      case 3:
        return <Payment 
                  setBooking={setBooking}
                  booking={booking}
                />;
      default:
        // throw new Error('Unknown step');
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
      </AppBar>
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Drone Booking
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <>
              {!loading && (
                <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Congratulations! You have booked the Drone
                </Typography>
                <Typography variant="subtitle1">
                Thank you for your order.
                </Typography>
              </React.Fragment>
              )}
              </>
              
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? 'Confirm Payment' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}