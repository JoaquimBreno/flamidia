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
      lancheReg:"undefined",
      sessionDateReg: "undefined",
      date: "undefined",
      hour:"undefined",
      room:"undefined",
      chair:"undefined",
      sessionRoomReg: "undefined",
    };
    this.getMovie = this.getMovie.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleMovies = this.handleMovies.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.getDate = this.getDate.bind(this);
    this.saveState = this.saveState.bind(this);
  }

  saveState(state) {
    window.localStorage.setItem('state', JSON.stringify(state));
  }

  handleLogout = () => {
    logout();
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
    this.setState((prevState) => (
      {
        ...prevState,
        hour:e,
        sessionDateReg: prevState.sessionDateReg.filter(session => {return Number(session.horario) === Number(e);})
      }
    ));
  }

  handleRoom = (e) => {
    // find dictionary into movies with id = e and return the id
    this.setState((prevState) => (
      {
        ...prevState,
        room:e,
        sessionDateReg: prevState.sessionDateReg.filter(session => {return Number(session.id_sala) === Number(e);}),
        sessionRoomReg: this.session.filter(session => {return Number(session.id_sala) === Number(e);})
      }
    ));
  }

  handleChair = (e) => {
    // find dictionary into movies with id = e and return the id
    this.setState((prevState) => (
      {
        ...prevState,
        chair:e,
        sessionRoomReg: this.session.filter(session => {return Number(session.id_cadeira) === Number(e)})
      }
    ));
  }

  handleLanche= (e) => {
    // find dictionary into movies with id = e and return the id
    console.log(e);
    this.setState((prevState) => (
      {
        ...prevState,
        lancheReg: e
      }
    ));
  }

  handleLogin = () => {
    this.saveState({...this.state});
    login();
  }

  getDate = () => {
    return this.state.date;
  }

  getHour = () => {
    return this.state.hour;
  }

  getRoom = () => {
    return this.state.room;
  }

  getChair = () => {
    return this.state.chair;
  }

  getMovie = () => {
    return this.state.movieReg;
  }

  getLanche = () => {
    return this.state.lancheReg;
  }

  lancheFounder = () => {
    
    const lancheFound = this.lanchinho.find((lanche) => Number(lanche.id_oferta) === Number(this.state.lancheReg)).nome;
    return lancheFound;
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
    { id: 30,id_filme: 3, horario: "16:00", data: "2021-05-03", id_sala: "3"},
    { id: 30,id_filme: 3, horario: "16:00", data: "2021-05-03", id_sala: "4"},
  ]

  cadeira = [
    
    { id_sala: 1, id_cadeira: 23},
    { id_sala: 1, id_cadeira: 24},
    { id_sala: 2, id_cadeira: 25},
    { id_sala: 3, id_cadeira: 36},
    { id_sala: 4, id_cadeira: 47},
  ]
  
  lanchinho = [
    
    { id_oferta: 909, qtde_items: 23, preco: 2.5, nome: "pipoca"},
    { id_oferta: 2909, qtde_items: 23, preco: 1.5, nome: "coca"},
  ]

  render() {
    let results;
    if (this.getMovie()==="undefined") {
      results =         
      <div hidden></div>;
    } else {
        let movie = this.movieFinder();
        results = <Row className='justify-content-md-center mt-4'>
        {Object.keys(movie).map(function(key,index) {
          return (
            <Col key={key} xs lg="2" className={`align-self-center label_filme text-center ${key==="id" ? "invisible" : ""}`}>
              {movie[key]}
            </Col>
          )
        })}
       </Row>
       
    }

  return (
    <Container bg-color='black'>
      <div className='form'>
        {/* FILMINHO */} 
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
       
        {/* DATINHA */} 
        {this.getMovie()!=="undefined"?
          <Row className='justify-content-center mt-5 text-center'>
            <Col md="2" className='align-self-center label'>
                datinha?
            </Col>
            <Col md='auto'>
              <Dropdown onSelect= {this.handleDate}>
                <Dropdown.Toggle id="dropdown-basic" title="Dropdown button">
                  {this.getDate() === "undefined" ? "Escolhe a datinha": this.getDate()} 
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {this.session.filter(ses => Number(ses.id_filme) === Number(this.state.movieReg)).map((session) => (
                      <Dropdown.Item eventKey={session.data} key={session.id} >{session.data}</Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>       
        :
          <div hidden></div>
        }

        {/* HORINHA */} 
        {this.state.date!=="undefined"?
          <Row className='justify-content-center mt-5 text-center'>
            <Col md="2" className='align-self-center label'>
                horinha?
            </Col>
            <Col md='auto'>
              <Dropdown onSelect= {this.handleHour}>
                <Dropdown.Toggle id="dropdown-basic" title="Dropdown button">
                  {this.getHour() === "undefined" ? "Escolhe a horinha": this.getHour()} 
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {this.session.filter(ses => ses.data === this.state.date).map((session) => (
                      <Dropdown.Item eventKey={session.horario} key={session.horario} >{session.horario}</Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>       
        :
          <div hidden></div>
        }

        {/* SALINHA */}
        {this.state.hour!=="undefined"?
          <Row className='justify-content-center mt-5 text-center'>
            <Col md="2" className='align-self-center label'>
                salinha?
            </Col>
            <Col md='auto'>
              <Dropdown onSelect= {this.handleRoom}>
                <Dropdown.Toggle id="dropdown-basic" title="Dropdown button">
                  {this.getRoom() === "undefined" ? "Escolhe a salinha": this.getRoom()} 
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {this.session.filter(ses => ses.horario === this.state.hour).map((session) => (
                      <Dropdown.Item eventKey={session.id_sala} key={session.id_sala} >{session.id_sala}</Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>       
        :
          <div hidden></div>
        }

        {/* CADEIRINHA */}
        {this.state.room!=="undefined"?
          <Row className='justify-content-center mt-5 text-center'>
            <Col md="2" className='align-self-center label'>
                cadeirinha?
            </Col>
            <Col md='auto'>
              <Dropdown onSelect= {this.handleChair}>
                <Dropdown.Toggle id="dropdown-basic" title="Dropdown button">
                  {this.getChair() === "undefined" ? "Escolhe a cadeirinha": this.getChair()} 
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {this.cadeira.filter(cad => Number(cad.id_sala) === Number(this.state.room)).map((cadeira) => (
                      <Dropdown.Item eventKey={cadeira.id_cadeira} key={cadeira.id_cadeira} >{cadeira.id_cadeira}</Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>       
        :
          <div hidden></div>
        }

        {/* LANCHINHO */} 
        {this.state.chair!=="undefined"?
          <Row className='justify-content-center mt-5 text-center'>
            <Col md="2" className='align-self-center label'>
                lanchinho?
            </Col>
            <Col md='auto'>
              <Dropdown onSelect= {this.handleLanche} >
                <Dropdown.Toggle id="dropdown-basic" title="Dropdown button">
                  {this.getLanche() === "undefined"? "Escolha o lanchinho": this.lancheFounder()} 
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {this.lanchinho.map((lanchinho) => (
                      <Dropdown.Item eventKey={lanchinho.id_oferta} key={lanchinho.id_oferta} >{lanchinho.nome}</Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        :
        <div hidden></div>
        }


      </div>

      <footer className='fixar-rodape mt-5'>
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

        <Row className='justify-content-center footer mt-5 text-center'>
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