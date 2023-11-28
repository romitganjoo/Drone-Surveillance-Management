import  React, {useContext, useEffect, useState} from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import { Col, Row } from 'react-bootstrap';
import CallIcon from '@mui/icons-material/Call';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { mainListItems, secondaryListItems } from './listItems';
import { AuthContext }from './authenticaion/ProvideAuth';
import {useHistory} from 'react-router-dom';
import { fechInProgressBookings } from '../services/bookingService';
import InProgressBookingList from './booking/InProgressBookingList';
import BookBookingButton from './booking/BookBookingButton';
import GoogleMapReact from 'google-map-react';
import Marker from './user/Marker';
import { Progress, Space } from 'antd';

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

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  marginTop:'100px',
  backgroundColor:'white',
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const uluru = { lat: 37.3387, lng: -121.8853 };
  
  const triangleCoords = [{  lat: 25.774, lng: -80.19 },
    { lat: 18.466, lng: -66.118 },
    { lat: 32.321, lng: -64.757 },
    { lat: 25.774, lng: -80.19 }];

  const defaultProps = {
    center: uluru,
    zoom: 10
  };


var handleApiLoaded = (map, maps) => {

   var bermudaTriangle = new maps.Polygon({
    paths: triangleCoords,
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35
  });
  bermudaTriangle.setMap(map);
}
  
  const getMapOptions = (maps) => {
    return {
      disableDefaultUI: true,
      mapTypeControl: true,
      streetViewControl: true,
      styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'on' }] }],
    };
  };


const mdTheme = createTheme();

const DashboardContent = () => {

  const history = useHistory();
  const authContext = useContext(AuthContext);
  const {user, authState} = authContext;
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(true);
  // const [user, setUser] = useState();
  const toggleDrawer = () => {
    setOpen(!open);
  };

  console.log(authContext);
  
  return (
    <>
    {(
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>

        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          > 
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List>{mainListItems(user.persona)}</List>
          <Divider />
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              {(user.persona === 'customer' )&& 
                    (<Grid item xs={12} md={12} lg={12} xl={12}>
                      <Row>
                        <Col item xs={6} md={6} lg={6} xl={6}>
                          <Paper
                            sx={{
                              p: 2,
                              display: 'flex',
                              flexDirection: 'column',
                              height: 380,
                            }}
                          >
                            <BookBookingButton/>
                          </Paper>
                        </Col>

                        <Col item xs={6} md={6} lg={6} xl={6}>
                          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>                 
                            <br/>
                            <div style={{ height: '52vh', width: '100%' }}>

                            <GoogleMapReact
                                    onClick={ev => {
                                      console.log("latitide = ", ev.lat);
                                      console.log("longitude = ", ev.lng);
                                    }}
                              bootstrapURLKeys={{ key: "AIzaSyAc3tTkT5Qmm-A99sarIRLRQsVd0ORfP30"}}
                              defaultCenter={defaultProps.center}
                              defaultZoom={defaultProps.zoom}
                              yesIWantToUseGoogleMapApiInternals
                              options={getMapOptions}
                              onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
                            >

                            <Marker
                                        lat={37.3387}
                                        lng={-121.8853}
                                        name="My Marker"
                                        color="blue"
                                      />
                                      <Marker
                                        lat={40.3387}
                                        lng={-119.8853}
                                        name="My Marker"
                                        color="red"
                                      />
                            </GoogleMapReact>
                          </div>
                        </Paper>
                        </Col>
                      </Row>
                      
                    </Grid>
               )}

              {(user.persona === 'admin' )&& 
                    (<Grid item xs={12} md={6} lg={6}>
                      <Paper
                        sx={{
                          p: 2,
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <h5 style={{ fontWeight: 'bold' , color:'gray'}}> Number of drone by status</h5><br/>
                        <center>
                          <Space wrap>
                            <Progress type="circle" percent={100} strokeColor='purple' width={110} format={(percent) => `8`} />
                            <Progress type="circle" percent={70} strokeColor='green' width={110} format={(percent) => `3 Completed`} />
                            <Progress type="circle" percent={30} width={110} format={(percent) => `5 In-progress`} />
                          </Space>
                        </center>
                      </Paper>
                    </Grid>
               )}
               
                {(user.persona === 'admin' )&& 
                    (<Grid item xs={12} md={6} lg={6} xl={6}>
                        <Paper
                        sx={{
                          p: 2,
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                        >
                          <h5 style={{ fontWeight: 'bold' , color:'gray'}}> Number of drone by Type</h5><br/>
                          < div style={{ width: 400 }}>
                            <Progress percent={100} size="small" strokeColor='purple'format={() => `Total Drone`} />
                            <Progress percent={50} size="small"strokeColor='red' format={() => `Payload Service `} />
                            <Progress percent={25} size="small"strokeColor='blue' format={() => `Data Collection`}/>
                            <Progress percent={25} size="small" strokeColor='green' format={() => `Survilience`}/>
                          </div>
                        </Paper>
                    </Grid>
               )}

               
            {(user.persona === 'admin' || user.persona === 'owner')&& (<Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>                  
             
                    <br/>
                    <div style={{ height: '30vh', width: '100%' }}>

                    <GoogleMapReact
                            onClick={ev => {
                              console.log("latitide = ", ev.lat);
                              console.log("longitude = ", ev.lng);
                            }}
                      bootstrapURLKeys={{ key: "AIzaSyAS25W7fdYx-jn7Y64fq2o9pClTBDOGA40"}}
                      defaultCenter={defaultProps.center}
                      defaultZoom={defaultProps.zoom}
                      yesIWantToUseGoogleMapApiInternals
                      options={getMapOptions}
                      onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
                    >
  
                    <Marker
                                lat={37.3387}
                                lng={-121.8853}
                                name="My Marker"
                                color="blue"
                              />
                              <Marker
                                lat={40.3387}
                                lng={-119.8853}
                                name="My Marker"
                                color="red"
                              />
                    </GoogleMapReact>
                  </div>
                </Paper>
              </Grid>)}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  {(user.persona === 'admin' || user.persona === 'customer' )&& 
                    (<h5 style={{ fontWeight: 'bold' , color:'gray'}}> Services in progress</h5>)}
                  
                  {(user.persona === 'owner' )&& 
                    (<h5 style={{ fontWeight: 'bold' , color:'gray'}}> Upcoming Drone flights</h5>)}

                    <br/>
                  <InProgressBookingList/>
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
    )}
    </>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}