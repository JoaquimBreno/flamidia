import React, { Component } from 'react';
import '../../styles/pages/Payment.css';
import { logout} from '../../utils';
class Payment extends Component {
  constructor(){
    super();
    logout();
  }

  render() {
    return (
      <div>
        <h1 color='white'>Payment</h1>
      </div>
    );
  }
}

export default Payment;