import React, {useState, useEffect, useContext} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {fetchBookingListFromDB} from '../../services/bookingService';
import { AuthContext } from '../authenticaion/ProvideAuth';
import {useLocation} from 'react-router-dom';

function createData(bookingNumber, droneNumber, date,  charge) {
  return { bookingNumber, droneNumber, charge, date };
}



export default function BookingList() {

    const location = useLocation();
    console.log(location);

    //const {persona } = location.state;
    const {persona } = 'admin';
    const authContext = useContext(AuthContext);
    const {user} = authContext;
    const [bookingList, setBookingList] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchBookingList();
    }, []);
    console.log(authContext);

    const fetchBookingList = async () => {
        const {user} = authContext;
        console.log('Auth Context', user);
        const resp = await fetchBookingListFromDB(user.userId, user.persona);
        if(resp.status === 200){
            const rows = [];
            console.log(resp.data.payload);
            resp.data.payload.forEach(el=> {
                console.log(el);
                const { droneNumber, droneId, bookingId, source, 
                    destination, status, chargePerHour} = el;
                rows.push({
                    droneId,
                    droneNumber, 
                    bookingId, 
                    source, 
                    destination,
                    status, 
                    chargePerHour,
                })
            });
            setBookingList(rows);
            setLoading(false);
        }
        else{
            console.log(resp.data.message);
        }

    }

    return (
        <>
        {!loading && (
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell align="right">Booking Number</TableCell>
                <TableCell align="right">Source</TableCell>
                <TableCell align="right">Destination</TableCell>
                <TableCell align="right">Charge Per Daye</TableCell>
                <TableCell align="right">Drone Number</TableCell>
                <TableCell align="right">Status</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {bookingList.map((row) => (
                <TableRow
                key={row.droneId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell align="right" component="th" scope="row">
                    {row.bookingId}
                </TableCell>
                <TableCell align="right">{row.source}</TableCell>
                <TableCell align="right">{row.destination}</TableCell>
                <TableCell align="right">{row.chargePerHour}</TableCell>
                <TableCell align="right">{row.droneNumber}</TableCell>
                <TableCell style={{color:' green'}}align="right">{row.status}</TableCell>

                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
        )}
        </>
    );
}