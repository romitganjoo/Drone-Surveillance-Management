import React, {useState}  from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import {AsyncTypeahead} from 'react-bootstrap-typeahead';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import { Col, Row } from 'react-bootstrap';
import GoogleMapReact from 'google-map-react';
import _ from 'lodash';
import Autocomplete from "react-google-autocomplete";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Marker from '../user/Marker';
const DroneTracking = () => {
    var m;
    var ms;

    var land1 = [{lat: 37.33728, lng: -121.882643}, {lat: 37.337212, lng: -121.879059}, {lat: 37.33525
, lng:-121.881098
}];

    var land2 = [{lat: 37.594137670106356, lng: -121.9917274801814
    }, {lat: 37.59590586030879
, lng: -121.97765124727124
}, {lat: 37.584887990548815, lng: -121.98812259126538}];

var land3 = [{lat: 37.61331810720046, lng: -121.92456629450831
}, {lat: 37.616309633020315
, lng: -121.907400156813}, {lat: 37.60271081866213, lng: -121.91495325739893}];

    var data = require('./response.json'); 
    var coordinateArray = data.tracking_data;
    const triangleCoords = [];


var setPolygon = (map, maps) => {
    var bermudaTriangle = new maps.Polygon({
        paths: triangleCoords,
        strokeColor: "#000000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35
      });
      bermudaTriangle.setMap(map);

}
    console.log(triangleCoords);

//    const triangleCoords = [{ lat: 25.774, lng: -80.19 },
//     { lat: 18.466, lng: -66.118 },
//     { lat: 32.321, lng: -64.757 },
//     { lat: 25.774, lng: -80.19 }]
    var handleApiLoaded = (map, maps) => {

       m = map;
       ms = maps;
        var bermudaTriangle = new maps.Polygon({
         paths: land1,
         strokeColor: "#000000",
         strokeOpacity: 0.8,
         strokeWeight: 2,
         fillColor: "#FFFFFF",
         fillOpacity: 0.35
       });
       bermudaTriangle.setMap(map);

      //  var bermudaTriangle2 = new maps.Polygon({
      //   paths: land2,
      //   strokeColor: "#000000",
      //   strokeOpacity: 0.8,
      //   strokeWeight: 2,
      //   fillColor: "#FF0000",
      //   fillOpacity: 0.35
      // });
      // bermudaTriangle2.setMap(map);

      // var bermudaTriangle1 = new maps.Polygon({
      //   paths: land3,
      //   strokeColor: "#000000",
      //   strokeOpacity: 0.8,
      //   strokeWeight: 2,
      //   fillColor: "#242424",
      //   fillOpacity: 0.35
      // });
      // bermudaTriangle1.setMap(map);
     }
     const getMapOptions = (maps: any) => {
        return {
          disableDefaultUI: true,
          mapTypeControl: true,
          streetViewControl: true,
          styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'on' }] }],
        };
      };     

    const uluru = { lat: 37.33728, lng: -121.882643};
  
    const defaultProps = {
        center: uluru,
        zoom: 16
      };


      return (
        <React.Fragment>
          <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
            <Row>   
            <Col>
        
            <br></br><br></br></Col></Row>
            <div style={{ height: '100vh', width: '100%' }}>
         
            <GoogleMapReact
            onClick={ev => {
              triangleCoords.push({lat: ev.lat, lng: ev.lng});
              console.log(triangleCoords);
            //   setPolygon(m,ms)
            }}
      bootstrapURLKeys={{ key: "AIzaSyAS25W7fdYx-jn7Y64fq2o9pClTBDOGA40"}}
      defaultCenter={defaultProps.center}
      defaultZoom={defaultProps.zoom}
      yesIWantToUseGoogleMapApiInternals
      options={getMapOptions}
      onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
    >
    <Marker
            lat={37.33728}
            lng={-121.882643}
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
          </Container>
        </React.Fragment>
      );
    }

export default DroneTracking;
