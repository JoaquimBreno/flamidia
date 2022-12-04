import React, { Component } from 'react';
import { Route, Routes} from 'react-router-dom';
import Form  from './pages/form/Form';
import Payment from './pages/payment/Payment';
import './App.css';
import PrivateRoute from "./pages/PrivateRoute";
// import PublicRoute from "./pages/PrivateRoute";
class App extends Component {

  render(){
    return (
    <>
    <div>
        <div className='header'>
          <Routes>
            <Route path="/" element={<Form />} />
            <Route path="/payment" element={<PrivateRoute/>}>
              <Route path="" element={<Payment/>} />
            </Route>
          </Routes>
        </div>
    </div>
    </>
    );
  }
}

export default App;
