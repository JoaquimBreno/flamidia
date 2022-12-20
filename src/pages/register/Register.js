import React, { Component, useState }from 'react';
import '../../styles/pages/Payment.css';
import HeaderLogo from '../../assets/header_logo.png';
import { Formik, ErrorMessage, Form, Field, useFormikContext} from 'formik';
import * as Yup from 'yup';
import {Button, FormGroup, Row, Col} from 'react-bootstrap';
import { login, logout, isLogin } from '../../utils';
import axios from 'axios';

function Payment() {
  const [formik] = useState(useFormikContext());

  return (
    <PaymentComponent formik={formik} />
  );
}

class PaymentComponent extends Component {
  constructor(){
    super();
    this.state = {
      isLogin: isLogin(),
      cliente: [],
      movies: [],
      session: [],
      chairs: [],
      movieReg: "undefined",
      lancheReg:"undefined",
      sessionDateReg: "undefined",
      date: "undefined",
      hour:"undefined",
      room:"undefined",
      chair:"undefined",
      sessionRoomReg: "undefined",
    }
    this.formik = this.props;
    this.saveState = this.saveState.bind(this);
  }

  saveState(state) {
    window.localStorage.setItem('state', JSON.stringify(state));
  }

  handleLogout = () => {
    logout();
  }

  handleLogin = () => {
    console.log(this.state)
    this.saveState({...this.state});
    login();
    window.location.assign("/form");
  }

  mountClientes(cliente) {
    const body = {}
    body.parameter=cliente
    console.log(body)
    axios.post(body,'https://flaapimidia.herokuapp.com/cliente/create/')
    .then(response => {
      console.log(response.data.result);
    })
    .catch(error => {
      console.error(error);
    });
  }

  render() {

    const FormSchema = Yup.object().shape({
      name: Yup.string().required('O nome é obrigatório'),
      age: Yup.number()
      .required('A idade é obrigatória')
      .test('age', 'A idade deve ser um número inteiro', value => Number.isInteger(value)),
      flamengo: Yup.boolean().default(false),
      estudante: Yup.boolean().default(false)
    });
    


    return (
      <div>
        <div className='header'><img src={HeaderLogo} alt="HeaderLogo"/></div>
        <div>{this.state.trem}</div>    
        <Formik
          initialValues={{ name: '', age: '', flamengo: false, estudante: false}}
          validationSchema={FormSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            
            this.setState({cliente: values});
            this.mountClientes(values)
            // aqui você pode enviar os valores do formulário para a API ou fazer qualquer outra coisa
            // this.handleLogin()
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <FormGroup>
                <Field name="name" type="text" placeholder="Seu nome" />
                <ErrorMessage name="name" />
              </FormGroup>
              <FormGroup>
                <Field name="age" type="text" placeholder="Sua idade" />
                <ErrorMessage name="age" />
              </FormGroup>
              <FormGroup>
                <Field name="flamengo" type="checkbox" /> Flamengo
                <Field name="estudante" type="checkbox" /> Estudante
              </FormGroup>
              <Button className='justify-content-center mt-5 text-center' type="submit" disabled={isSubmitting}>
                Enviar
              </Button>
            </Form>
          )}
        </Formik>

      </div>
    );
  }
}

export default Payment;