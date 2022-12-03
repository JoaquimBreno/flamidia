import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import '../../styles/pages/Form.css';
import { Link } from "react-router-dom";
class Form extends Component {

  render() {
  return (
    <Container>
      <div className='form'>
        <h1>My Form</h1>
        <li>
          <Link to="/payment">Payment</Link>
        </li>
      </div>
    </Container>
  );
  }
}

export default Form;