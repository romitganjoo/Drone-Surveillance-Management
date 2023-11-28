import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import BookingList from './DroneList';

const ReviewDrone = (props) => {

    const {drone} = props;
    return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 400 }} aria-label="simple table">
            <TableBody>
                <TableRow
                    key={drone.droneId}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="drone">
                        Number
                    </TableCell>
                    <TableCell align="right">{drone.droneNumber}</TableCell>
                </TableRow>
                <TableRow
                    key={drone.model}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="drone">
                        Usage Type
                    </TableCell>
                    <TableCell align="right">{drone.model}</TableCell>
                </TableRow>
                <TableRow
                    key={drone.droneType}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="drone">
                        Model Type
                    </TableCell>
                    <TableCell align="right">{drone.type}</TableCell>
                </TableRow>
                <TableRow
                    key={drone.chargePerHour}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="drone">
                        Expected Charge Per Day 
                    </TableCell>
                    <TableCell align="right">{drone.chargePerHour}</TableCell>
                </TableRow>
                <TableRow
                    key={drone.cmileage}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="drone">
                        Mileage 
                    </TableCell>
                    <TableCell align="right">{drone.mileage}</TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      );
}

export default ReviewDrone;