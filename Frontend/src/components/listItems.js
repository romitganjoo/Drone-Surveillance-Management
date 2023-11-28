import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PaidIcon from '@mui/icons-material/Paid';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import ListAltIcon from '@mui/icons-material/ListAlt';
import TodayIcon from '@mui/icons-material/Today';
import CloudIcon from '@mui/icons-material/Cloud';

import { Redirect } from 'react-router-dom';
import { Link } from "react-router-dom";
export const mainListItems = (persona) => {
  console.log(persona);

  const buttonDownload = () => {
        // using Java Script method to get PDF file
        fetch('Service_report.pdf').then(response => {
            response.blob().then(blob => {
                // Creating new object of PDF file
                const fileURL = window.URL.createObjectURL(blob);
                // Setting various property values
                let alink = document.createElement('a');
                alink.href = fileURL;
                alink.download = 'Service_report.pdf';
                alink.click();
            })
        })
    }

  return(
    <div>
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText style={{color: 'Black'}} primary="Dashboard" />
      </ListItem>
      
      <ListItem button component={Link} to="/profile">
        <ListItemIcon>
          <AssignmentIndIcon />
        </ListItemIcon>
        <ListItemText style={{color: 'Black'}} primary="Profile" />
      </ListItem>


      <ListItem button component ={Link} to="/pricing">
              <ListItemIcon>
                <PaidIcon />
              </ListItemIcon>
              <ListItemText style={{color: 'Black'}} primary="Payment Plans" />
            </ListItem>

      <ListItem button component ={Link} to="/searchDrone">
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText style={{color: 'Black'}} primary="Mission Planner" />
      </ListItem>

          <ListItem button component ={Link} to="/BookingList">
            <ListItemIcon>
              <LibraryBooksIcon/>
            </ListItemIcon>
            <ListItemText style={{color: 'Black'}} primary="View Bookings" />
          </ListItem>

          {/* <ListItem button component ={Link} to="/Schedule">
            <ListItemIcon>
              <CalendarMonthIcon/>
            </ListItemIcon>
            <ListItemText style={{color: 'Black'}} primary="View Schedules" />
          </ListItem>
 */}

        {/* <ListItem button component ={Link} to="/BookingList">
          <ListItemIcon>
            <LibraryBooksIcon/>
          </ListItemIcon>
          <ListItemText style={{color: 'Black'}} primary="All Bookings" />
        </ListItem> */}

      <ListItem button component ={Link} to="/DroneTracking">
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText style={{color: 'Black'}} primary="Drone Tracking" />
      </ListItem>

      <ListItem button onClick={buttonDownload}>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText style={{color: 'Black'}} primary="Service Report" />
      </ListItem>
      
      {/* <ListItem button onClick={buttonDownload}>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText style={{color: 'Black'}} primary="Alerts" />
      </ListItem> */}
      
      <ListItem button component ={Link} to="/AddAlert">
        <ListItemIcon>
          <ListAltIcon />
        </ListItemIcon>
        <ListItemText style={{color: 'Black'}} primary="Live Drone" />
      </ListItem>

      <ListItem button component ={Link} to="/AlertList">
        <ListItemIcon>
          <ListAltIcon />
        </ListItemIcon>
        <ListItemText style={{color: 'Black'}} primary="Alerts" />
      </ListItem>


        <ListItem button component={Link} to='/DroneTracking'>
        <ListItemIcon>
          <LocationOnIcon/><StackedLineChartIcon />
        </ListItemIcon>
        <ListItemText style={{color: 'Black'}} primary="Track Drones" />
      </ListItem>

        <ListItem button component={Link} to='/AddDrone'>
        <ListItemIcon>
          <PlaylistAddIcon />
        </ListItemIcon>
        <ListItemText style={{color: 'Black'}} primary="Add Drone" />
      </ListItem>


        <ListItem button component ={Link} to="/DroneList">
        <ListItemIcon>
          <ListAltIcon />
        </ListItemIcon>
        <ListItemText style={{color: 'Black'}} primary="View Drones" />
      </ListItem>


        <ListItem button>
          <a href="http://ec2-52-203-10-77.compute-1.amazonaws.com/flightmonitor/">
            <CloudIcon/>
            <ListItemText style={{color: 'Black'}} primary="Cloud station" />
        </a>
      </ListItem>


    </div>
  )};


      {/* {(persona === 'customer' )&& (<Link to={{
        pathname: '/pricing',
        state: {
          persona: 'customer'
        }}}>
            <ListItem button>
              <ListItemIcon>
                <PaidIcon />
              </ListItemIcon>
              <ListItemText style={{color: 'Black'}} primary="Payment Plans" />
            </ListItem>
        </Link>
      )}

      {(persona === 'customer' )&& (<Link to={{
      pathname: '/searchDrone',
      state: {
        persona: 'customer'
      }}}>
      <ListItem button >
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText style={{color: 'Black'}} primary="Book Drone Service" />
      </ListItem>
      </Link>
      )}

      {(persona === 'owner') && (
        <Link to={{
          pathname: '/BookingList',
          state: {
            persona: 'owner'
          }}}>
          <ListItem button >
            <ListItemIcon>
              <LibraryBooksIcon/>
            </ListItemIcon>
            <ListItemText style={{color: 'Black'}} primary="View Bookings" />
          </ListItem>
        </Link>
      )}

      {(persona === 'owner') && (
        <Link to={{
          pathname: '/Schedule',
          state: {
            persona: 'owner'
          }}}>
          <ListItem button >
            <ListItemIcon>
              <CalendarMonthIcon/>
            </ListItemIcon>
            <ListItemText style={{color: 'Black'}} primary="View Schedules" />
          </ListItem>
        </Link>
      )}

      {(persona === 'admin') && (
      <Link to={{
        pathname: '/BookingList',
        state: {
          persona: 'admin'
        }}}>
        <ListItem button >
          <ListItemIcon>
            <LibraryBooksIcon/>
          </ListItemIcon>
          <ListItemText style={{color: 'Black'}} primary="All Bookings" />
        </ListItem>
        </Link>
      )}
      
      {(persona === 'customer' )&& (<Link to={{
      pathname: '/BookingList',
      state: {
        persona: 'customer'
      }}}>
      <ListItem button >
        <ListItemIcon>
          <LibraryBooksIcon/>
        </ListItemIcon>
        <ListItemText style={{color: 'Black'}} primary="All Bookings" />
      </ListItem>
      </Link>
      )}

{(persona === 'customer' )&& (<Link to={{
      pathname: '/DroneTracking',
      state: {
        persona: 'customer'
      }}}>
      <ListItem button >
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText style={{color: 'Black'}} primary="Drone Tracking" />
      </ListItem>
      </Link>
      )}
      {(persona === 'customer' )&& (<Link to={{
      pathname: '',
      state: {
        persona: 'customer'
      }}}>
      <ListItem button onClick={buttonDownload}>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText style={{color: 'Black'}} primary="Service Report" />
      </ListItem>
      </Link>
      )}
      
      {(persona === 'admin' )&& (
        <ListItem button component={Link} to='/DroneTracking'>
        <ListItemIcon>
          <LocationOnIcon/><StackedLineChartIcon />
        </ListItemIcon>
        <ListItemText style={{color: 'Black'}} primary="Track Drones" />
      </ListItem>
      )}

      {(persona === 'admin' )&& (
        <ListItem button component={Link} to='/AddDrone'>
        <ListItemIcon>
          <PlaylistAddIcon />
        </ListItemIcon>
        <ListItemText style={{color: 'Black'}} primary="Add Drone" />
      </ListItem>
      )}


      {(persona === 'admin') && (
      <Link to={{
        // pathname: '/BookingList',
        pathname: '/DroneList',
        state: {
          persona: 'admin'
        }
        }}>
        <ListItem button>
        <ListItemIcon>
          <ListAltIcon />
        </ListItemIcon>
        <ListItemText style={{color: 'Black'}} primary="View Drones" />
      </ListItem>
      </Link>
      )}

      {(persona === 'admin' )&& (
        <ListItem button>
          <a href="http://ec2-52-203-10-77.compute-1.amazonaws.com/flightmonitor/">
            <CloudIcon/>
            <ListItemText style={{color: 'Black'}} primary="Cloud station" />
        </a>
      </ListItem>
      )}

    </div>
  )}; */}

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText style={{color: 'Black'}} primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText style={{color: 'Black'}} primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText style={{color: 'Black'}} primary="Year-end sale" />
    </ListItem>
  </div>
);