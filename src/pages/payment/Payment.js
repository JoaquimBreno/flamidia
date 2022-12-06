import React, { Component } from 'react';
import '../../styles/pages/Payment.css';
import { logout} from '../../utils';
import HeaderLogo from '../../assets/header_logo.png';
class Payment extends Component {
  constructor(){
    super();
    this.state = JSON.parse(window.localStorage.getItem('state')) || {
      isLogin: "undefined",
      movieReg: "undefined",
      lancheReg:"undefined",
      sessionDateReg: "undefined",
      date: "undefined",
      hour:"undefined",
      room:"undefined",
      chair:"undefined",
      sessionRoomReg: "undefined"
    }
    logout();
  }

  render() {
    return (
      <div>
        <div className='header'><img src={HeaderLogo} alt="HeaderLogo"/></div>
        <div>{this.state.trem}</div>
      </div>
    );
  }
}

export default Payment;