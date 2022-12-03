import React, { Component } from 'react';
import { Route, Routes} from 'react-router-dom';
import Form  from './pages/form/Form';
import Payment from './pages/payment/Payment';
import './App.css';
import PrivateRoute from "./pages/PrivateRoute";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false
    };
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.login = this.login.bind(this);
  }
  isAuthenticated() {
    return this.state.isAuthenticated;
  }

  login() {
    this.setState({ isAuthenticated: !this.state.isLoggedIn });
  }

  render(){
    return (
    <>
    <div>
        <div className='header'>
          <div color="white">{this.isAuthenticated() ? "Logged in" : "Not Logged in"}</div>

          <Routes>
            <Route path="/" element={() =>
            <Form login={this.login} isLogged={this.state.isAuthenticated} />} />
            <PrivateRoute
              path="/payment"
              element={Payment}
              isAuthenticated={!!this.isAuthenticated()}
            />
          </Routes>
        </div>
    </div>
    </>
    );
  }
}

export default App;
