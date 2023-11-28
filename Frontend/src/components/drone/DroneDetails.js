import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Card } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';

const DroneDetails = props => {

  const {drone, setDrone} = props;

  const handleFormChange = (e,field) => {
    setDrone({
      ...drone,
      [field]: e.target.value,
    })
  }

  const props_upload = {
    name: 'file',
    listType: 'picture',
    beforeUpload: (file) => {
      return false;
    },
    // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    // headers: {
    //   authorization: 'authorization-text',
    // },
    onChange(info) {
      console.log("info file - " + info.file);
      console.log("info fileList - " + info.fileList);
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };


  // const [image, setImage] = useState('');

  // function handleImage(e){
  //   console.log(e.target.files);
  //   setImage(e.target.files[0]);
  // }
  // function handleApi(){
  //   console.log(image);
  //   // setFile(URL.createObjectURL(image))
  //   const file = image;
  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     // convert file to base64 String
  //     const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
  //     // store file
  //     localStorage.setItem('wallpaper', base64String);
  //     // display image
  //     document.body.style.background = `url(data:image/png;base64,${base64String})`;
  //   };
  //   reader.readAsDataURL(file);
    
  // }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Add drone details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            id="droneNumber"
            name="droneNumber"
            label="Drone Number"
            fullWidth
            autoComplete="Drone Type"
            variant="standard"
            onChange={(e)=>handleFormChange(e,'droneNumber')}
            defaultValue={drone ? drone.droneNumber: ''}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="droneModel"
            name="droneModel"
            label="Drone Usage Type"
            fullWidth
            autoComplete="Drone Usage Type"
            variant="standard"
            onChange={(e)=>handleFormChange(e,'model')}
            defaultValue={drone ? drone.model: ''}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="chargesPerDay"
            name="chargesPerDay"
            label="Your expected charges: $"
            fullWidth
            autoComplete="Your expected charges: $"
            variant="standard"
            onChange={(e)=>handleFormChange(e,'chargePerHour')}
            defaultValue={drone ? drone.chargePerHour: ''}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="mileage"
            name="Mileage"
            label="Mileage of you drone"
            fullWidth
            autoComplete="Mileage of you drone"
            variant="standard"
            onChange={(e)=>handleFormChange(e,'mileage')}
            defaultValue={drone ? drone.mileage: ''}
          />
        </Grid>
        {/* <Typography variant="h7" gutterBottom>
        Drone Model
        </Typography> */}
        <Grid item xs={12}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            displayEmpty
            value={props.drone? props.drone.type : ''}
            label="Drone Type"
            onChange={(e)=>handleFormChange(e,'type')}
            autoWidth
            style={{width:'30%'}}
          >
            {/* <MenuItem value="">Drone Model</MenuItem> */}
            <MenuItem value={'Mini'}>DJI Mini SE Data collection</MenuItem>
            <MenuItem value={'Phantom'}>DJI Phantom Pro 4 Surveillence</MenuItem>
            <MenuItem value={'Agras'}>DJI Agras T20 Payload</MenuItem>
            </Select>
          </Grid>
        <Grid item xs={12}>
          <Upload.Dragger {...props_upload}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload.Dragger>
          {/* <input type="file" name="file" onChange={handleImage}/>
          <button onClick={handleApi}>Upload</button> */}
          </Grid>
        <Grid item xs={12}>
          <br></br>
          <br></br>
          </Grid>
        {/* <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="I confirm that I am 21 years old or over."
          />
        </Grid> */}
      </Grid>
    </React.Fragment>
  );
}

export default DroneDetails;