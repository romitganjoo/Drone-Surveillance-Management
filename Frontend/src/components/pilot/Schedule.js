import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import Scheduler from "react-mui-scheduler"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Grid from '@mui/material/Grid';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Col, Row } from 'react-bootstrap';
import BookingList from '../drone/DroneList';
import { Divider } from 'antd';
import Button from '@mui/material/Button';

function ScheduleApp() {
    const [state] = useState({
      options: {
        transitionMode: "zoom", // or fade
        startWeekOn: "mon",     // or sun
        defaultMode: "month",    // or week | day | timeline
      },
      
      toolbarProps: {
        showSearchBar: true,
        showSwitchModeButtons: true,
        showDatePicker: true
      }
    })

    const events = [
        {
          id: "event-1",
          label: "Payload Service",
          groupLabel: "Nimish Arya",
          user: "Nimish Arya",
          color: "#099ce5",
          startHour: "09:00 AM",
          endHour: "12:00 PM",
          date: "2022-12-09",
          createdAt: new Date(),
          createdBy: "Admin"
        },
        {
          id: "event-2",
          label: "Data Collection Service",
          groupLabel: "Nimish Arya",
          user: "Nimish Arya",
          color: "orange",
          startHour: "09:00 AM",
          endHour: "04:00 PM",
          date: "2022-12-06",
          createdAt: new Date(),
          createdBy: "Admin"
        },
        {
          id: "event-3",
          label: "Survillence Service",
          groupLabel: "Nimish Arya",
          user: "Nimish Arya",
          color: "green",
          startHour: "09:00 AM",
          endHour: "10:00 AM",
          date: "2022-12-12",
          createdAt: new Date(),
          createdBy: "Admin"
        },

        {
            id: "event-4",
            label: "Payload Service",
            groupLabel: "Johnson",
            user: "Johnson",
            color: "#099ce5",
            startHour: "10:00 AM",
            endHour: "02:00 PM",
            date: "2022-12-07",
            createdAt: new Date(),
            createdBy: "Admin"
          },
          {
            id: "event-5",
            label: "Data Collection Service",
            groupLabel: "Johnson",
            user: "Johnson",
            color: "orange",
            startHour: "09:00 AM",
            endHour: "04:00 PM",
            date: "2022-12-14",
            createdAt: new Date(),
            createdBy: "Admin"
          },
          {
            id: "event-6",
            label: "Survillence Service",
            groupLabel: "Johnson",
            user: "Johnson",
            color: "green",
            startHour: "09:00 AM",
            endHour: "10:00 AM",
            date: "2022-12-13",
            createdAt: new Date(),
            createdBy: "Admin"
          },

          {
            id: "event-7",
            label: "Data Collection Service",
            groupLabel: "Navika Babbar",
            user: "Navika Babbar",
            color: "orange",
            startHour: "10:00 AM",
            endHour: "02:00 PM",
            date: "2022-12-08",
            createdAt: new Date(),
            createdBy: "Admin"
          },
          {
            id: "event-8",
            label: "Data Collection Service",
            groupLabel: "Navika Babbar",
            user: "Navika Babbar",
            color: "orange",
            startHour: "09:00 AM",
            endHour: "04:00 PM",
            date: "2022-12-21",
            createdAt: new Date(),
            createdBy: "Admin"
          },
          {
            id: "event-10",
            label: "Survillence Service",
            groupLabel: "Nimish Arya",
            user: "Nimish Arya",
            color: "green",
            startHour: "09:00 AM",
            endHour: "10:00 AM",
            date: "2022-12-10",
            createdAt: new Date(),
            createdBy: "Admin"
          },
          {
            id: "event-11",
            label: "Survillence Service",
            groupLabel: "Navika Babbar",
            user: "Navika Babbar",
            color: "green",
            startHour: "09:00 AM",
            endHour: "10:00 AM",
            date: "2022-12-10",
            createdAt: new Date(),
            createdBy: "Admin"
          },
          {
            id: "event-9",
            label: "Survillence Service",
            groupLabel: "Navika Babbar",
            user: "Navika Babbar",
            color: "green",
            startHour: "09:00 AM",
            endHour: "10:00 AM",
            date: "2022-12-15",
            createdAt: new Date(),
            createdBy: "Admin"
          }

      ]
      
      const handleCellClick = (event, row, day) => {
        // Do something...
      }
      
      const handleEventClick = (event, item) => {
        // Do something...
      }
      
      const handleEventsChange = (item) => {
        // Do something...
      }
      
      const handleAlertCloseButtonClicked = (item) => {
        // Do something...
      }

      return (
        <Grid xl={12} md={12} lg={12} sm={12} xs={12} style={{marginLeft:250}}>
            <Row>
                <center>
                    <br/>
                    <h4 style={{ fontWeight: 'bold' }}>Your Schedules</h4>
                    <Col>
                        <Scheduler
                        locale="en"
                        events={events}
                        legacyStyle={false}
                        options={state?.options}
                        toolbarProps={state?.toolbarProps}
                        onEventsChange={handleEventsChange}
                        onCellClick={handleCellClick}
                        onTaskClick={handleEventClick}
                        onAlertCloseButtonClicked={handleAlertCloseButtonClicked}
                        />
                    </Col>
                </center>
            </Row>
        </Grid>
      )
    }


export default ScheduleApp;