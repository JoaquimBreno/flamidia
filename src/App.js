import React, { Component } from 'react';
import { Route, Routes} from 'react-router-dom';
import Form from './pages/form/Form';
import Payment from './pages/payment/Payment';
import './App.css';
import PrivateRoute from "./pages/PrivateRoute";
import { Row, Col } from 'react-bootstrap';
import footerlogo  from './assets/footer_logo.png';
// import PublicRoute from "./pages/PrivateRoute";
class App extends Component {

  render(){
    return (

    <div className='desktop-body'>
        <div className='header'>
          <Routes>
            <Route path="/" element={<Form />} />
            <Route path="/payment" element={<PrivateRoute/>}>
              <Route path="" element={<Payment/>} />
            </Route>
          </Routes>
        </div>
        <footer className='mt-5'>
          <Row className='justify-content-center footer mt-5 text-center'>
            <Col md='auto'>
              <img src={footerlogo} alt='footer_logo'></img>
            </Col>
          </Row>
        </footer>
    </div>

    );
  }
}

export default App;
