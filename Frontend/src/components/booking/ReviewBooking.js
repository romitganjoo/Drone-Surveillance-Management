import React from 'react';
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

const ReviewBooking = (props) => {

    const {booking} = props;

    function printReceipt() {
        window.print();
      };

    return (
        <Grid>
            <Row>
                <Col lg={5} md={5} xs={12}>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            
                            <TableBody>
                                <TableRow
                                    key={booking.source}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                    <TableCell component="th" scope="booking">
                                        Campus
                                    </TableCell>
                                    <TableCell align="right">{booking.source}</TableCell>
                                </TableRow>
                                <TableRow
                                    key={booking.destination}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                    <TableCell component="th" scope="booking">
                                        Drone route
                                    </TableCell>
                                    <TableCell align="right">{booking.destination}</TableCell>
                                </TableRow>
                                <TableRow
                                    key={booking.droneType}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                    <TableCell component="th" scope="booking">
                                        Type
                                    </TableCell>
                                    <TableCell align="right">{booking.droneType}</TableCell>
                                </TableRow>
                                <TableRow
                                    key={booking.droneId}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                    <TableCell component="th" scope="booking">
                                        Number
                                    </TableCell>
                                    <TableCell align="right">{booking.droneNumber}</TableCell>
                                </TableRow>
                                <TableRow
                                    key={booking.model}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                    <TableCell component="th" scope="booking">
                                        Model
                                    </TableCell>
                                    <TableCell align="right">{booking.model}</TableCell>
                                </TableRow>
                                <TableRow
                                    key={booking.chargePerHour}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                    <TableCell component="th" scope="booking">
                                        Charge Per Hour
                                    </TableCell>
                                    <TableCell align="right">${booking.chargePerHour}</TableCell>
                                </TableRow>

                            </TableBody>
                        </Table>
                    </TableContainer>
                </Col>
                <Col>
                    <div class="print-receipt" >
                        <h2>Bill</h2>
                        <Grid>
                            <Row>
                                <Col>
                                <img height={160} width={160} src={"https://images.unsplash.com/photo-1473968512647-3e447244af8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZHJvbmV8ZW58MHx8MHx8&w=1000&q=80"} />
                                </Col>
                                <Col style={{textAlign: 'left'}}>
                                    Booking Id: 1490<br/>
                                    Route : {booking.destination} <br/>
                                    Drone Type: {booking.droneType}<br/>
                                    Charge/hour: ${booking.chargePerHour}<br/>
                                    Total Hours : 4 hrs<br/>
                                    Other Chargers : $100
                                    <Divider>Total Charges</Divider>
                                    <center> Payment= $580</center>
                                    <Button
                                        variant="contained"
                                        sx={{ mt: 3, ml: 1 }}
                                        class="hide-on-print" 
                                        onClick={printReceipt}
                                    >
                                        Download Bill
                                    </Button>
                                    {/* <button class="hide-on-print" onClick={printReceipt}>Print</button> */}
                                </Col>
                            </Row>
                        </Grid>
                    </div>
                </Col>
            </Row>
        </Grid>
        
      );
}

export default ReviewBooking;