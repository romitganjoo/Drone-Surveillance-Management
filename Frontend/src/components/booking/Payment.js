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
import 'react-credit-cards/es/styles-compiled.css';
import Cards from 'react-credit-cards';
import  {useState}  from 'react';

const Payment = (props) => {
    
    const[state, setState] = useState({cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
  });

    const {booking} = props;

   
      function handleInputName(e){
        setState({...state, name: e.target.value});    
      }
      
      function handleInputChange(e){
        setState({...state, number: e.target.value});    
      }

      function handleInputCVC(e){
        setState({...state, cvc: e.target.value});    
      }

      function handleInputexpiry(e){
        setState({...state, expiry: e.target.value});    
      }

    return (
        <Grid>
            <div>
                <Grid>
                    <center><h3>Payment</h3></center><br/>
                    <div id="PaymentForm">
                        <Row>
                            <Col md={5} lg={5} xs={5} sm={5}>
                                    <Cards
                                    cvc={state.cvc}
                                    expiry={state.expiry}
                                    name={state.name}
                                    number={state.number}
                                    />
                            </Col>
                            <Col md={5} lg={5} xs={12} sm={12}>
                            <form>
                                <input
                                    type="tel"
                                    name="number"
                                    placeholder="Card Number"
                                    onChange={handleInputChange}
                                /><br/> <br/>

                                <input
                                    type="text"
                                    name="Name"
                                    placeholder="Name on Card"
                                    onChange={handleInputName}
                                /><br/> <br/>
                                
                                <input
                                    type="text"
                                    name="expiry"
                                    placeholder="expiry mm/yy"
                                    onChange={handleInputexpiry}
                                /><br/> <br/>

                                <input
                                type="number"
                                name="cvc"
                                placeholder="CVC ***"
                                onChange={handleInputCVC}
                                min={1000}
                                max={9999}
                                />

                                <br/> <br/>
                            </form>
                            </Col>
                        </Row> 
                    </div>
                </Grid>
            </div>
        </Grid>
        
      );
}

export default Payment;