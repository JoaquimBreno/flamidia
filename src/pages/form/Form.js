import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import '../../styles/pages/Form.css';
import { Link} from "react-router-dom";
import { Dropdown } from 'react-bootstrap'
import { login, logout, isLogin } from '../../utils';
class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: isLogin()
    };
  }

  handleLogout = () => {
    logout();
    this.setState({
        isLogin: false
    })
  }

  
  handleLogin = () => {
    login();
  }

  countries = [
    
    { label: "Kenya", value: "Kenya", id: 1 },
    { label: "India", value: "India", id: 2 },
    { label: "Botswana", value: "Botswana", id: 3 }
  ]

  
  render() {
  return (
    <Container>
      <div className='form'>
        <div color="white">
          {this.state.isLogin ? 
                    <button onClick={() => this.handleLogout()}>Click here to log out</button>
                    : <button onClick={() => this.handleLogin()}><Link  to="/payment">login</Link></button>
          }
        </div>
        <h1>My Form</h1>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Dropdown Button
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <li>
          <Link to="/payment">Payment</Link>
        </li>
      </div>
    </Container>
  );
  }
}

export default Form;