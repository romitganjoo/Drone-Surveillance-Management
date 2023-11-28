import React, {useState, useEffect, useContext} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { AuthContext } from '../authenticaion/ProvideAuth';
import {fechInProgressBookings} from '../../services/bookingService';
import {deleteBooking} from '../../services/bookingService';
import { Button} from 'react-bootstrap';

// function createData(bookingNumber, droneNumber, date,  charge) {
//   return { bookingNumber, droneNumber, charge, date };
// }


const InProgressBookingList = props => {
    const authContext = useContext(AuthContext);
    const {user} = authContext;
    const [inProgressBookings, setInProgressBookings] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        getInProgressBookings();
    },[])

    const getInProgressBookings = async () => {
        setLoading(true);
        const {userId, persona} = user;
        const resp = await fechInProgressBookings(userId, persona);
        if(resp.status === 200){
            setInProgressBookings(resp.data.payload);
            setLoading(false);
        }
        else{
            console.log(resp.data.message);
        }
    }

    function deleteUser(id) {
        setLoading(true);
        const bookingId = id;
        const persona = "customer";
        const status = deleteBooking(bookingId, persona);
        console.log("response status", status)
        alert("Successfully deleted Booking Id " + id)
        console.log("Logging delete for booking Id", bookingId)
        getInProgressBookings()
        // if(Number(status) == 200){
        //     // getInProgressBookings();
        //     alert("Successfully deleted Booking Id", bookingId)
        //     console.log("Logging delete for booking Id", bookingId)
        //     // setLoading(false);
        // }
        // else{
        //     console.log("Error");
        // }
    }

    //   const selectBooking = (e) =>{
    //     const {droneId,model, chargePerHour } = JSON.parse(e.target.value);
    //     console.log("Booking selected", JSON.parse(e.target.value));
    //     const {setBooking, booking} = props;
    //     setBooking({
    //       ...booking,
    //       droneId,
    //       model, 
    //       chargePerHour,
    //     })
    //   }

    //   const fetchDroneList = async (type) => {
    //     const resp = await fetchDroneListFromDB(type);
    //     console.log(resp);
    //     if(resp.status === 200){
    //       console.log(resp.data.payload);
    //       const rows = [];
    //       resp.data.payload.forEach(el => {
    //         const { droneId, ownerId, type, model, chargePerHour, mileage} = el;
    //         rows.push({
    //           droneId,
    //           ownerId, 
    //           type, 
    //           model,
    //           chargePerHour, 
    //           mileage,
    //         })
    //       });
    //       setDroneList(rows);

    //       setLoading(false);
    //     }
    //     else{
    //       console.log(resp.data.message);
    //     }

    //   }

    return (
        <>
        {!loading && (
        <>
        {inProgressBookings.length > 0 ? (
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    {(user.persona === 'admin' )&& (<TableCell >User Id</TableCell>)}
                    {(user.persona === 'admin' )&& (<TableCell align="right" >User Name</TableCell>)}
                    {(user.persona === 'admin' )&& (<TableCell align="right" >Source</TableCell>)}
                    {(user.persona === 'customer' )&& (<TableCell >Booking Id</TableCell>)}
                    {(user.persona === 'customer' )&& (<TableCell >Source</TableCell>)}
                    <TableCell align="right">Destination</TableCell>
                    <TableCell align="right">Drone Number</TableCell>
                    <TableCell align="right">Status</TableCell>
                    {/* <TableCell align="right">Edit</TableCell>
                    <TableCell align="right">Delete</TableCell> */}
                </TableRow>
                </TableHead>
                <TableBody>
                {inProgressBookings.map((row) => (
                    <TableRow
                    key={row.bookingId}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    {(user.persona === 'admin' )&& (<TableCell component="th" scope="row">{row.userId}</TableCell>)}
                    {(user.persona === 'admin' )&& (<TableCell align="right"> {row.fname} </TableCell>)}
                    {(user.persona === 'admin' )&& (<TableCell align="right"> {row.source} </TableCell>)}
                    {(user.persona === 'customer' )&& (<TableCell component="th" scope="row"> {row.bookingId} </TableCell>)}
                    {(user.persona === 'customer' )&& (<TableCell component="th" scope="row"> {row.source} </TableCell>)}
                    <TableCell align="right">{row.destination}</TableCell>
                    <TableCell align="right">{row.droneId}</TableCell>
                    <TableCell style={{color:' green'}}align="right">{row.status}</TableCell>
                    {/* <Button variant="contained" color='blue'>Edit</Button> */}
                    <button onClick={() => deleteUser(row.bookingId)} className="btn btn-sm btn-danger btn-delete-user">
                        {user.isDeleting 
                            ? <span className="spinner-border spinner-border-sm"></span>
                            : <span>Delete</span>
                        }
                    </button>
                        
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        ) : (
            <span>No Bookings in Progress</span>
        )
        }
        
        </>
        )}
        </>
    );
}

export default InProgressBookingList;