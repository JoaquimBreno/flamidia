import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import '../../styles/pages/Form.css';
import { Dropdown, Button, Row, Col } from 'react-bootstrap';
import { login, logout, isLogin } from '../../utils';
import footerlogo  from '../../assets/footer_logo.png';
class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: isLogin(),
      movieReg: "undefined"
    };
    this.getMovie = this.getMovie.bind(this);
    this.handleMovies = this.handleMovies.bind(this);
  }

  handleLogout = () => {
    logout();
    this.setState({
        isLogin: false
    })
  }

  handleMovies = (e) => {
    // find dictionary into movies with id = e and return the id
    this.setState({ movieReg: this.movies.find((movie) => Number(movie.id) === Number(e)).id });
  }

  handleLogin = () => {
    login();
  }

  getMovie = () => {
    return this.state.movieReg;
  }

  movieFinder = () => {
    const movieFound = this.movies.find((movie) => Number(movie.id) === Number(this.state.movieReg));
    return movieFound;
  }

  movies = [
    
    { label: "Crepusculo1", id: 1, ator: "Robert Pattinson", ano: 2008, genero: "Romance", nacionalidade: "EUA", idade:"18"},
    { label: "Crepusculo2", id: 2, ator: "Robert Pattinson2", ano: 20082, genero: "Romance2", nacionalidade: "EUA", idade:"18"},
    { label: "Crepusculo3", id: 3, ator: "Robert Pattinson3", ano: 20083, genero: "Romance3", nacionalidade: "EUA" , idade:"18"}
  ]

  session = [
    
    { label: "Crepusculo1", id: 1},
    { label: "Crepusculo2", id: 2},
    { label: "Crepusculo3", id: 3}
    
  ]
  
  render() {
    let button;
    if (this.getMovie()==="undefined") {
      button =         
      <div hidden></div>;
    } else {
        let movie = this.movieFinder();
        button = <>
        {Object.keys(movie).map(function(key,index) {
          return (<Row className='justify-content-center mt-3 text-center'>
          <Col md="3" className='align-self-center label'>
            {movie[key]}
          </Col>
         </Row>)
        })}
       </>
    }

  return (
    <Container bg-color='black'>
      <div className='form'>
        <Row className='justify-content-center mt-5 text-center'>
          <Col md="2" className='align-self-center label'>
              filminho?
          </Col>
          <Col md='auto'>
            <Dropdown onSelect= {this.handleMovies}>
              <Dropdown.Toggle id="dropdown-basic" title="Dropdown button">
                {this.state.movieReg === "undefined"? "Escolha o filme": this.movieFinder().label} 
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {this.movies.map((movie) => (
                    <Dropdown.Item eventKey={movie.id} key={movie.id} >{movie.label}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
        
        {button}
        <Row className='justify-content-center mt-5 text-center'>
          <Col md="2" className='align-self-center label'>
            {/* {this.getMovie() === "undefined"?"undefined":this.movieFinder().ator} */}
          </Col>
        </Row>
{/* 
        <Row className='justify-content-center mt-5 text-center'>
          <Col md="2" className='align-self-center label'>
              cadeirinha?
          </Col>
          <Col md='auto'>
            <Dropdown onSelect= {this.handlemovieChange}>
              <Dropdown.Toggle id="dropdown-basic" title="Dropdown button">
                {this.state.movieReg === "undefined"? "Escolha o filme": this.state.movieReg} 
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {this.movies.map((movie) => (
                    <Dropdown.Item eventKey={movie.label} key={movie.id} >{movie.label}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>

        <Row className='justify-content-center mt-5 text-center'>
          <Col md="2" className='align-self-center label'>
              lanchinho?
          </Col>
          <Col md='auto'>
            <Dropdown onSelect= {this.handlemovieChange}>
              <Dropdown.Toggle id="dropdown-basic" title="Dropdown button">
                {this.state.movieReg === "undefined"? "Escolha o filme": this.state.movieReg} 
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {this.movies.map((movie) => (
                    <Dropdown.Item eventKey={movie.label} key={movie.id} >{movie.label}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>

        <Row className='justify-content-center mt-5 text-center'>
          <Col md="2" className='align-self-center label'>
              horinha?
          </Col>
          <Col md='auto'>
            <Dropdown onSelect= {this.handlemovieChange}>
              <Dropdown.Toggle id="dropdown-basic" title="Dropdown button">
                {this.state.movieReg === "undefined"? "Escolha o filme": this.state.movieReg} 
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {this.movies.map((movie) => (
                    <Dropdown.Item eventKey={movie.label} key={movie.id} >{movie.label}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>

        <Row className='justify-content-center mt-5 text-center'>
          <Col md="2" className='align-self-center label'>
              datinha?
          </Col>
          <Col md='auto'>
            <Dropdown onSelect= {this.handleMovies}>
              <Dropdown.Toggle id="dropdown-basic" title="Dropdown button">
                {this.state.movieReg === "undefined"? "Escolha o filme": this.state.movieReg} 
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {this.movies.map((movie) => (
                    <Dropdown.Item eventKey={movie.label} key={movie.id} >{movie.label}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row> */}

        <Row className='justify-content-center mt-5 text-center'>
          <Col md='auto'>
            <div>
              {this.state.isLogin ? 
                        <Button variant="danger" onClick={() => this.handleLogout()}>Click here to log out</Button>
                        : <Button href="/payment" variant="danger" onClick={() => this.handleLogin()}>chamaa!</Button>
              }
            </div>
          </Col>
        </Row>

      </div>

      <footer className='fixar-rodape text-center'>
        <Row className='justify-content-center footer'>
          <Col md='auto'>
            <img src={footerlogo} alt='footer_logo'></img>
          </Col>
        </Row>
      </footer>
    </Container>

  );
  }
}

export default Form;