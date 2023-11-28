import React, {useState, useEffect, useContext} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CardMedia from '@mui/material/CardMedia';
import Paper from '@mui/material/Paper';
import {deleteDroneRecord, fetchDroneListFromDB, fetchDroneListFromDBForOwner,fetchAlertListFromDBForOwner} from '../../services/droneService';
import Radio from '@mui/material/Radio';
import { AuthContext } from '../authenticaion/ProvideAuth';


function createData(alertid, droneid, date,  reason, userid) {
  return { alertid, droneid, date, reason, userid };
}

const rows = [
  createData('1', '8CPA850', '11/10/2021', 16.0 ),
  createData('2', '7YPN393', '11/09/2021', 29.0),
  createData('3', '8AMF954', '11/09/2021', 56.0),
  createData('4', '8AMF954', '10/19/2021', 76.0),
  createData('5', '8AMF954', '10/09/2021', 76.0),
  createData('6', '8AMF954', '10/06/2021', 146.0),
  createData('7', '7MWL676', '09/30/2021', 122.0),
  createData('8', '7MWL676', '09/29/2021', 102.0),
  createData('9', '8AMF954', '09/19/2021', 56.0),
  createData('10','8AMF954', '05/09/2021', 86.0),
  createData('11', '8AMF954', '05/09/2021', 86.0),

];

export default function AlertList(props) {

  const authContext = useContext(AuthContext);
  const {user} = authContext;
  const [droneList, setDroneList] = useState();
  const [loading, setLoading] = useState(true);
  console.log(props); 
  useEffect(() => {
      const {user} = authContext;
      const {userId} = user;
      fetchAlertListForOwner(userId);
  }, [])

  const selectDrone = (e) =>{
    const {alertid, droneid, dtime, reason, userid  } = JSON.parse(e.target.value);
    const {setBooking, booking} = props;
    setBooking({
      ...booking,
       alertid, 
            droneid,
            dtime, 
            reason,
            userid
    })
  }

  const fetchAlertListForOwner = async (id) => {
    const resp = await fetchAlertListFromDBForOwner(id);
    if(resp.status === 200){
      const rows = [];
      console.log(resp.data.payload);
      resp.data.payload.forEach(el => {
        const { alertid, droneid, dtime, reason, userid} = el;
        rows.push({
            alertid, 
            droneid,
            dtime, 
            reason,
            userid
        })
      });
      setDroneList(rows);

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
            {props.booking ? (
              <>
              <TableCell>Select</TableCell>
              <TableCell >Alert Number</TableCell>
              </>
            ) : (
            <TableCell align="right">Alert Number</TableCell>
            )}
            <TableCell >Drone</TableCell>
            <TableCell >Time-stamp</TableCell>
            <TableCell >Reason</TableCell>
            {/* <TableCell align="right">Delete</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {droneList.map((row) => {
            // console.log('ROW', row);
            return(
            <TableRow
              key={row.alertid}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            
              {props.booking ? (
                <>
                <Radio value={JSON.stringify(row)} checked={row.alertid === props.booking.alertid} onChange={selectDrone}/>
                <TableCell align="right">{row.alertid}</TableCell>
                </>
              ): (
                <TableCell align="right">{row.alertid}</TableCell>

              )}
              { (
                <TableCell >
                  {/* <CardMedia
                      component="img"
                      imageWidth="50"
                      imageHeight="50"
                      // sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
                      image="https://img.tttcdn.com/product/xy/2000/2000/p/gu1/R/1/RM13847C-1-1/RM13847C-1-1-1-d0a9-nlyb.jpg"         
                      roundedColor="tranparent"
                      alt="{post.imageLabel}"
                    /> */}
                    {/* <img height={50} width={50} src={"https://img.tttcdn.com/product/xy/2000/2000/p/gu1/R/1/RM13847C-1-1/RM13847C-1-1-1-d0a9-nlyb.jpg"}/> */}
                    {row.droneid}
                </TableCell>)}

                {/* {(row.type === 'Mini') && (
                <TableCell align="right">
                  <img height={50} width={50} src={"https://img.tttcdn.com/product/xy/2000/2000/p/gu1/R/1/RM12729B-2-1/RM12729B-2-1-1-865d-PJKX.jpg"}/>
                </TableCell>)}

                {(row.type === 'Agras') && (
                <TableCell align="right">
                  <img height={50} width={50} src={"https://img.tttcdn.com/product/xy/2000/2000/p/gu1/R/1/RM12729B-2-1/RM12729B-2-1-1-865d-1Zu5.jpg"}/>
                </TableCell>)} */}

              <TableCell >{row.dtime}</TableCell>
              <TableCell >{row.reason}</TableCell>
              {/* <TableCell align="right">
              {
              (<button 
              // onClick={() => updateDrone(row.droneId)} 
              className="btn btn-sm btn-primary btn-update-drone">
              { <span>Update</span>
              // user.isUpdating 
              //   ? <span className="spinner-border spinner-border-sm"></span>
              //   : <span>Update</span>
              }
            </button>
            )
          }
          </TableCell> */}
              {/* <TableCell align="right">
              {
              (<button onClick={() => deleteDrone(row.droneId)} className="btn btn-sm btn-danger btn-delete-user">
                  {user.isDeleting 
                      ? <span className="spinner-border spinner-border-sm"></span>
                      : <span>Delete</span>
                  }
              </button>)
          }
          </TableCell> */}

            </TableRow>
          )})}
        </TableBody>
      </Table>
    </TableContainer>
    )}
    </>
  );
}