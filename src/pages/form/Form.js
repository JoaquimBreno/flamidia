import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import '../../styles/pages/Form.css';
import { Dropdown, Button, Row, Col } from 'react-bootstrap';
import { login, logout, isLogin } from '../../utils';
import axios from 'axios';
class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      session: [],
      chairs: [],
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
    this.getSession = this.getSession.bind(this);
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
    this.mountSessao(e);
    this.setState((prevState) => ({ 
      ...prevState,
        movieReg: this.state.movies.find((movie) => Number(movie.id_filme) === Number(e)).id_filme, 
        sessionDateReg: this.state.session.filter(session => {return Number(session.id_filme) === Number(e);})
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
        sessionDateReg: this.state.session.filter(session => {return session.hora_inicio === e})
      }
    ));
  }

  handleRoom = (e) => {
    // find dictionary into movies with id = e and return the id
    this.mountCadeiras(e)
    this.setState((prevState) => (
      {
        ...prevState,
        room:e,
        sessionDateReg: prevState.sessionDateReg.filter(session => {return Number(session.id_sala) === Number(e);})
      }
    ));
    
  }

  handleChair = (e) => {
    // find dictionary into movies with id = e and return the id
    this.setState((prevState) => (
      {
        ...prevState,
        chair:e,
        sessionRoomReg: this.state.session.filter(session => {return Number(session.id_cadeira) === Number(e)})
      }
    ));
    console.log(this.state)
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

  getSession = () => {
    return this.state.session;
  }

  getLanche = () => {
    return this.state.lancheReg;
  }

  lancheFounder = () => {
    
    const lancheFound = this.lanchinho.find((lanche) => Number(lanche.id_oferta) === Number(this.state.lancheReg)).nome;
    return lancheFound;
  }

  movieFinder = () => {
    const movieFound = this.state.movies.find((movie) => Number(movie.id_filme) === Number(this.state.movieReg));

    return movieFound;
  }

  /**
   * API SERVICES
   * 
   */

  componentDidMount() {
    this.mountMovies();
  }

  mountMovies() {
    axios.get('https://flaapimidia.herokuapp.com/filme/')
    .then(response => {
      console.log(response.data.result);
      this.setState({ movies: response.data.result });
    })
    .catch(error => {
      console.error(error);
    });
  }

  mountSessao(){
    axios.get('https://flaapimidia.herokuapp.com/sessao')
    .then(response => {
      console.log(response.data.result);
      this.setState({ session: response.data.result });
    })
    .catch(error => {
      console.error(error);
    });
  }

  mountSessaoById(idFilme) {
    console.log(idFilme);
    axios.get('https://flaapimidia.herokuapp.com/sessao/id/'+idFilme)
    .then(response => {
      console.log(response.data.result);
      this.setState({ session: response.data.result });
    })
    .catch(error => {
      console.error(error);
    });
  }

  mountCadeiras(idSala){
    axios.get('https://flaapimidia.herokuapp.com/cadeira/id/'+ idSala)
    .then(response => {
      console.log(response.data.result);
      this.setState({ chairs: response.data.result });
    })
    .catch(error => {
      console.error(error);
    });
  }
  /**
   * 
   * 
   */

  /**movies = [
    
     { label: "Crepusculo1", id: 1, ator: "Robert Pattinson", ano: 2008, genero: "Romance", nacionalidade: "EUA", idade:"18"},
     { label: "Crepusculo2", id: 2, ator: "Robert Pattinson2", ano: 20082, genero: "Romance2", nacionalidade: "EUA", idade:"18"},
     { label: "Crepusculo3", id: 3, ator: "Robert Pattinson3", ano: 20083, genero: "Romance3", nacionalidade: "EUA" , idade:"18"}
   ]**/

  // session = [
    
  //   { id: 10,id_filme: 1, horario: "14:00", data: "2021-05-01", id_sala: "1"},
  //   { id: 20,id_filme: 2, horario: "15:00", data: "2021-05-02", id_sala: "2"},
  //   { id: 30,id_filme: 3, horario: "16:00", data: "2021-05-03", id_sala: "3"},
  //   { id: 30,id_filme: 96, horario: "16:00", data: "2021-05-03", id_sala: "4"},
  // ]

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
            <Row key={key} xs lg="2" className={`align-self-center label_filme text-center ${key==="id_filme" ? "invisible" : ""}`}>
              {key==="img_filme" ? <img src={movie[key]} alt="img" className="img-fluid"/> : movie[key]}
            </Row>
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
                {this.getMovie() === "undefined"? "Escolha o filme": this.movieFinder().nome_filme} 
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {this.state.movies.map((movie) => (
                  movie.nome_filme !== null?
                    <Dropdown.Item eventKey={movie.id_filme} key={movie.id_filme} >{movie.nome_filme}</Dropdown.Item>:
                    null
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
        
        {results}
       
        {/* DATINHA */} 
        {this.state.session.length?
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
                  {this.state.session.filter(ses => Number(ses.id_filme) === Number(this.state.movieReg)).map((session) => (
                      <Dropdown.Item eventKey={session.data} key={session.id_sessao} >{session.data}</Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>       
        :
          null
        }

        {/* HORINHA  */}
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
                  {this.state.session.filter(ses => ses.data === this.state.date).map((session) => (
                      <Dropdown.Item eventKey={session.hora_inicio} key={session.hora_inicio} >{session.hora_inicio}</Dropdown.Item>
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
                  {this.state.session.filter(ses => ses.hora_inicio === this.state.hour).map((session) => (
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
        {this.state.chairs.length?
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
                  {this.state.chairs.filter(cad => Number(cad.id_sala) === Number(this.state.room)).map((cadeira) => (
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
        {/* {this.state.chair!=="undefined"?
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
        } */}

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

    </Container>

  );
  }
}

export default Form;