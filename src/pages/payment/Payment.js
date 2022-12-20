import React, { Component } from 'react';
import '../../styles/pages/Payment.css';
import { logout} from '../../utils';
import HeaderLogo from '../../assets/header_logo.png';
import { Formik, ErrorMessage, Form, Field, withFormik} from 'formik';
import * as Yup from 'yup';
import {Button, FormGroup} from 'react-bootstrap';
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
            console.log(values)
            // aqui você pode enviar os valores do formulário para a API ou fazer qualquer outra coisa
            
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
              <Button type="submit" disabled={isSubmitting}>
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