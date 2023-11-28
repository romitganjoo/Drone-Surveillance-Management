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

import {addAlert} from '../../services/authenticationService';
import { AuthContext } from '../authenticaion/ProvideAuth';
import YouTube from 'react-youtube';

const AddAlert = () => {
    const [videoId, setVideoId] = useState('6kRtbn_bNNU');
  
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        autoplay: 1,
      },
    };
  
    const handleClick = async () => {
      // handle button click here
      console.log('Button clicked!');
      var data1= {
        droneid: 'd48',
        dtime:new Date(Date.now()),
        reason:'Fire Alert',
        userid:'3'
      };
  
      console.log(data1);
      const response = await addAlert(data1);
    }
    const handleClick1 = async () => {
      // handle button click here
      console.log('Button clicked!');
      var data1= {
        droneid: 'd48',
        dtime:new Date(Date.now()),
        reason:'Theft Alert',
        userid:'5'
      };
      console.log(data1);
      const response = await addAlert(data1);
    }
    const handleClick2 = async () => {
      // handle button click here
      console.log('Button clicked!');
      var data1= {
        droneid: 'd48',
        dtime:new Date(Date.now()),
        reason:'Illegal Dumping',
        userid:'5'
      };
      console.log(data1);
      const response = await addAlert(data1);
    }

    const handleClick3 = async () => {
      // handle button click here
      console.log('Button clicked!');
      var data1= {
        droneid: 'd48',
        dtime:new Date(Date.now()),
        reason:'Misc Emergency',
        userid:'5'
      };
      console.log(data1);
      const response = await addAlert(data1);
    }
  
    return (
      <div>
        <YouTube videoId={videoId} opts={opts} />
        <p><button onClick={handleClick}>Fire Alert</button></p>
        <p><button onClick={handleClick1}>Theft Alert</button></p>
        <p><button onClick={handleClick2}>Illegal Dumping</button></p>
        <p><button onClick={handleClick3}>Misc Emergency</button></p>
        
      </div>
      
    );
  }

  export default AddAlert;