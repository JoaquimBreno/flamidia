import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import '../../styles/pages/Form.css';
import { Link} from "react-router-dom";
import { Dropdown, Row, Col } from 'react-bootstrap';
import { login, logout, isLogin } from '../../utils';
class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: isLogin(),
      countryReg: "undefined"
    };
    this.handleCountryChange = this.handleCountryChange.bind(this);
  }

  handleLogout = () => {
    logout();
    this.setState({
        isLogin: false
    })
  }
  handleCountryChange = (e, event) => {
    console.log(e);
    this.setState({ countryReg: e });
  }

  handleLogin = () => {
    login();
  }

  countries = [
    
    { label: "Crepusculo", id: 1, ator: "Robert Pattinson", ano: 2008, genero: "Romance"},
    { label: "Crepusculo2", id: 2, ator: "Robert Pattinson2", ano: 20082, genero: "Romance2" },
    { label: "Crepusculo3", id: 3, ator: "Robert Pattinson3", ano: 20083, genero: "Romance3" }
  ]

  
  render() {
  return (
  
    <Container bg-color='black'>

      <Row className='justify-content-md-center'>
        <Col md='auto'>
          <div color="white">
            {this.state.isLogin ? 
                      <button onClick={() => this.handleLogout()}>Click here to log out</button>
                      : <button onClick={() => this.handleLogin()}><Link  to="/payment">login</Link></button>
            }
          </div>
          <h1>My Form</h1>
        </Col>
      </Row>
      
      <Row className='justify-content-md-center'>
        <Col md='auto'>
          <Dropdown onSelect= {this.handleCountryChange}>
            <Dropdown.Toggle id="dropdown-basic-.Toggle" title="Dropdown button">
              {this.state.countryReg == "undefined"? "Escolha o filme": this.state.countryReg} 
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {this.countries.map((country) => (
                  <Dropdown.Item eventKey={country.label} key={country.id} >{country.label}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      <Row className='justify-content-md-center'>
        <Col md='auto'>
          <div color="white">
            {this.state.isLogin ? 
                      <button onClick={() => this.handleLogout()}>Click here to log out</button>
                      : <button onClick={() => this.handleLogin()}><Link  to="/payment">login</Link></button>
            }
          </div>
        </Col>
      </Row>

    </Container>

  );
  }
}

export default Form;