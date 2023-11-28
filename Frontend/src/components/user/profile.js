import React, {useContext, useEffect, useState} from 'react';
import ListItem from '@mui/material/ListItem';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Wallet from './wallet';
import { Col, Row } from 'react-bootstrap';
import img from './land1.png';
import img2 from './land2.png';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import ProvideAuth, { AuthContext } from '../authenticaion/ProvideAuth';
import Button from '@mui/material/Button';
import {updateUserProfile, getUserDetails} from '../../services/userService';
import {useHistory} from 'react-router-dom';
import { Link } from "react-router-dom";
import ReactRoundedImage from "react-rounded-image";


export default function Profile(props) {  
  const history = useHistory();
  
  const [loading, setLoading] = useState(true);

  const authContext = useContext(AuthContext);
  const [userId, setUserId] = useState(authContext.user.userId);
  const [user, setUser] = useState();
  


  useEffect(()=>{
    fetchUserDetails();
  },[]);

  const fetchUserDetails = async () =>{
    setLoading(true);
    
    const res = await getUserDetails(userId);
    if(res.status === 200){
      setUser(res.data.payload);
      setLoading(false);
    } 
    else{
      console.log('Error Occured');
    }

  }

  const updateUserData = async () => {
    const obj = {
      userId: user.userId,
      fname : document.getElementById('firstName').value === '' ?  
        user.fname : 
        document.getElementById('firstName').value,
      lname : document.getElementById('lastName').value === '' ? 
        user.lname :
        document.getElementById('lastName').value,
      email : document.getElementById('email').value === '' ? 
        user.email :
        document.getElementById('email').value,
      phone : document.getElementById('phoneNumber').value === ''?
        user.phone :
        document.getElementById('phoneNumber').value,
      zip : document.getElementById('zip').value === '' ? 
        user.zip :
        document.getElementById('zip').value,
      address : document.getElementById('address1').value === '' ?
        user.address :
        document.getElementById('address1').value,
      country : document.getElementById('country').value === '' ? 
        user.country :
        document.getElementById('country').value,
      state : document.getElementById('state').value === '' ?  
        user.state :
        document.getElementById('state').value,
      walletBalance: 890,
    }
    setUser(obj);

    const response = await updateUserProfile(obj);
    if(response.status === 200){
      setUser(response.data.payload.data);
      setTimeout(()=>{
        history.push('/Dashboard');
      }, 500);
    } 
    else{
      console.log('Error Occuered');
    }



  }

  return (
      <React.Fragment>
        {!loading && (
        <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
         <Row>   
        <Col>
            <br/><br/><br/>
            {(user.persona === 'customer') && (<ReactRoundedImage sx={{ my: { xs: 1, md: 6 }, p: { xs: 2, md: 3 } }}
            image="https://media.istockphoto.com/id/1326518001/photo/happy-female-farmer-holding-a-wood-box-containing-fresh-vegetables.jpg?b=1&s=170667a&w=0&k=20&c=jHYrjrRjNoXxbR50k5KtMTqXWgKhJSaWRtX3pgnIQiM="
            roundedColor="tranparent"
            imageWidth="250"
            imageHeight="250"
            roundedSize="13"
            hoverColor="#1c3f60"
          />)}

            {(user.persona === 'owner') && (<ReactRoundedImage sx={{ my: { xs: 1, md: 6 }, p: { xs: 2, md: 3 } }}
            image="https://www.shutterstock.com/image-photo/young-man-drone-virtual-reality-260nw-1030510987.jpg"
            roundedColor="tranparent"
            imageWidth="250"
            imageHeight="250"
            roundedSize="13"
            hoverColor="#1c3f60"
          />)}

            {(user.persona === 'admin') && (<ReactRoundedImage sx={{ my: { xs: 1, md: 6 }, p: { xs: 2, md: 3 } }}
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqhFB4mkDousEdDcsoVE8h3DwCy7qEv_y8uQ&usqp=CAU"
            roundedColor="tranparent"
            imageWidth="270"
            imageHeight="250"
            roundedSize="13"
            hoverColor="#1c3f60"
          />)}

          <br/><br/>
          
          {(user.persona === 'owner') && (<CardMedia
              component="img"
              imageWidth="250"
              imageHeight="250"
              // sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
              image="https://executiveflyers.com/wp-content/uploads/2022/04/What-Does-a-Pilots-License-Look-Like-Student-Sport-Recreational-Private-Commercial-Airline.jpg"          roundedColor="tranparent"
              alt="{post.imageLabel}"
            />)}
          
        </Col>
        <Col>
        <br></br><br></br>
        <Typography variant="h6" gutterBottom>
        Personal information
      </Typography><br/><br/><br/>
      <Grid container spacing={3}>
        <Grid item xs={11} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            defaultValue={user.fname}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            defaultValue={user.lname}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
            required
            id="phoneNumber"
            name="phoneNumber"
            label="phoneNumber"
            fullWidth
            autoComplete="phone-number"
            variant="standard"
            defaultValue={user.phone}
          />
        </Grid>
        
        
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            autoComplete="email"
            variant="standard"
            defaultValue={user.email}
          />
        </Grid>

        {(user.persona === 'owner') && (<Grid item xs={12} sm={6}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            defaultValue={user.address}
          />
        </Grid>)}

        {(user.persona === 'owner') && (<Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            defaultValue={user.city}
          />
        </Grid>)}

        {(user.persona === 'owner') && (<Grid item xs={12} sm={6}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            defaultValue={user.address}
          />
        </Grid>)}

        {(user.persona === 'owner') && (<Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
            defaultValue={user.state}
          />
        </Grid>)}

        {(user.persona === 'owner') && (<Grid item xs={12} sm={6}>
          <TextField
             required
             id="zip"
             name="zip"
             label="Zip / Postal code"
             fullWidth
             autoComplete="shipping postal-code"
             variant="standard"
             defaultValue={user.zip}
          />
        </Grid>)}

        {(user.persona === 'owner') && (<Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
            defaultValue={user.country}
          />
        </Grid>)}

        {(user.persona === 'owner') && (<Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={updateUserData}
              >
                Update Details
        </Button>)}

        </Grid>
        <br></br><br></br></Col></Row>
        {(user.persona === 'customer') && (<Row><Col>
        <br/><br/>
        <Typography variant="h6" gutterBottom>
        Personal Address<br/><br/>
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            defaultValue={user.address}
          />

        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            defaultValue={user.city}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
            defaultValue={user.state}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            defaultValue={user.zip}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
            defaultValue={user.country}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid>
        <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={updateUserData}
              >
                Update Details
        </Button>
      </Grid>
      </Col>
      <Col>
      <Grid container>
        <Paper variant="outlined" sx={{ my: { xs: 1, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Card>
              <CardMedia
              component="img"
              // sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
              image="https://www.marianfarmsbiodynamic.com/wp-content/uploads/2021/04/Current-Cert-2020-1-796x1024.jpg"
              alt="{post.imageLabel}"
            />
            <h6>Lisence</h6>
            </Card>
        </Paper>
      </Grid>
      </Col></Row>)}
      {(user.persona === 'customer') && (<Row>
        <Col>
          <br/><br/>
          <Typography variant="h6" gutterBottom>
            Farmer Plots<br/><br/>
          </Typography>


          <div  >
    				<div class="product">
              <CardMedia
              component="img"
              // sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
              image={img}
                            alt="{post.imageLabel}"
            />
    					<div class="text py-3 pb-4 px-3 text-center">
    						<h6>Plot 1: Josh</h6>
		    					<p><span>4000 Sq.ft.</span></p>
    					</div>
    				</div>
    			</div>

          <div class="col-md-6  ftco-animate">
    				<div class="product">
              <CardMedia
              component="img"
              // sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
              image={img2}
                            alt="{post.imageLabel}"
            />
    					<div class="text py-3 pb-4 px-3 text-center">
    						<h6>Plot 2: Kent Farms</h6>
		    					<p><span>8400 Sq.ft.</span></p>
    					</div>
    				</div>
    			</div>
          <ListItem button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}
              component={Link} to="/addLand">
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Add Plot
              </Button>
          </ListItem>

        </Col>
      </Row>)}
      </Container>
    )}
    </React.Fragment>
  );
}