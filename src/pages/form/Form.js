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
      movieReg: "undefined",
      sessionDateReg: "undefined",
      date: "undefined",
      hour:"undefined",
      sessionHourReg: "undefined",
      sessionRoomReg: "undefined",
    };
    this.getMovie = this.getMovie.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleMovies = this.handleMovies.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.getSession = this.getSession.bind(this);
  }

  handleLogout = () => {
    logout();
    this.setState((prevState) => ({
      ...prevState,
      isLogin: false
    }))
  }

  handleMovies = (e) => {
    // find dictionary into movies with id = e and return the id
    this.setState((prevState) => ({ 
      ...prevState,
        movieReg: this.movies.find((movie) => Number(movie.id) === Number(e)).id, 
        sessionDateReg: this.session.filter(session => {return Number(session.id_filme) === Number(e);})
      })
    );

  }

  handleDate = (e) => {
    this.setState((prevState) => (
      {
        ...prevState,
        date:e
      }
    ));
      
  }

  handleHour = (e) => {
    // find dictionary into movies with id = e and return the id
    this.setState({ hour: e});
    const sessions = this.session.filter(session => {
      return Number(session.horario) === Number(e);
    })
    this.setState({ sessionDateReg: sessions });
    
  }

  handleRoom = (e) => {
    // find dictionary into movies with id = e and return the id
    this.setState({ sessionRoomReg: this.session.find((session) => Number(session.id) === Number(e)).id_sala });
  
  }

  handleLogin = () => {
    login();
  }

  getSession = () => {
    return this.state.date;
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
    
    { id: 10,id_filme: 1, horario: "14:00", data: "2021-05-01", id_sala: "1"},
    { id: 20,id_filme: 2, horario: "15:00", data: "2021-05-02", id_sala: "2"},
    { id: 30,id_filme: 3, horario: "16:00", data: "2021-05-03", id_sala: "3"}

  ]

  cadeira = [
    
    { id_sala: 1, id_cadeira: 1},
    { id_sala: 1, id_cadeira: 2},
    { id_sala: 2, id_cadeira: 2},
    { id_sala: 3, id_cadeira: 3}
  ]
  

  render() {
    let results;
    if (this.getMovie()==="undefined") {
      results =         
      <div hidden></div>;
    } else {
        let movie = this.movieFinder();
        results = <>
        {Object.keys(movie).map(function(key,index) {
          return (<Row key={key} className='justify-content-center mt-3 text-center'>
          <Col  md="3" className='align-self-center label'>
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
            <Dropdown onSelect= {this.handleMovies} >
              <Dropdown.Toggle id="dropdown-basic" title="Dropdown button">
                {this.getMovie() === "undefined"? "Escolha o filme": this.movieFinder().label} 
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {this.movies.map((movie) => (
                    <Dropdown.Item eventKey={movie.id} key={movie.id} >{movie.label}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
        
        {results}
       
        {this.getMovie()!=="undefined"?
          <Row className='justify-content-center mt-5 text-center'>
            <Col md="2" className='align-self-center label'>
                datinha?
            </Col>
            <Col md='auto'>
              <Dropdown onSelect= {this.handleDate}>
                <Dropdown.Toggle id="dropdown-basic" title="Dropdown button">
                  {this.getSession() === "undefined" ? "Escolhe a datinha": this.getSession()} 
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {this.state.sessionDateReg.map((session) => (
                      <Dropdown.Item eventKey={session.data} key={session.id} >{session.data}</Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>       
        :
          <div hidden></div>
        }
{/* 
        {this.state.sessionDateReg!=="undefined"?
          <Row className='justify-content-center mt-5 text-center'>
            <Col md="2" className='align-self-center label'>
                horinha?
            </Col>
            <Col md='auto'>
              <Dropdown onSelect= {this.handleHour}>
                <Dropdown.Toggle id="dropdown-basic" title="Dropdown button">
                  {this.getSession() !== undefined ? "Escolhe a horinha vadia": this.state.hour} 
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {this.state.sessionDateReg.map((session) => (
                      <Dropdown.Item eventKey={session.horario} key={session.id} >{session.horario}</Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>       
        :
          <div hidden></div>
        }

        {this.state.sessionHourReg!=="undefined"?
          <Row className='justify-content-center mt-5 text-center'>
            <Col md="2" className='align-self-center label'>
                salinha?
            </Col>
            <Col md='auto'>
              <Dropdown onSelect= {this.handleRoom}>
                <Dropdown.Toggle id="dropdown-basic" title="Dropdown button">
                  {this.getSession() !== undefined ? "Escolhe a salinha piranha": this.getSession().horario} 
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {this.session.map((session) => (
                      <Dropdown.Item eventKey={session.id_sala} key={session.id} >{session.id_sala}</Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>       
        :
          <div hidden></div>
        }

        {this.state.sessionRoomReg!=="undefined"?
          <Row className='justify-content-center mt-5 text-center'>
            <Col md="2" className='align-self-center label'>
                salinha?
            </Col>
            <Col md='auto'>
              <Dropdown onSelect= {this.handleRoom}>
                <Dropdown.Toggle id="dropdown-basic" title="Dropdown button">
                  {this.getSession() !== undefined ? "Escolhe a salinha piranha": this.getSession().horario} 
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {this.session.map((session) => (
                      <Dropdown.Item eventKey={session.id_sala} key={session.id} >{session.id_sala}</Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>       
        :
          <div hidden></div>
        }

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