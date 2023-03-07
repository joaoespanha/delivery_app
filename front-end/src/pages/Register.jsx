import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { post } from '../utils/api';
import { setLocalStorage } from '../utils/storage';
import '../styles/pages/LoginRegister.css';
import Logotipo from '../assets/images/logotipo1.svg';

const MINIMUM_PASSWORD_LENGTH = 6;
const MINIMUM_NAME_LENGTH = 12;

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const history = useHistory();

  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const isDisabled = password.length < MINIMUM_PASSWORD_LENGTH
  || !emailRegex.test(email) || name.length < MINIMUM_NAME_LENGTH;

  const register = async () => {
    let userRegister;

    try {
      const response = await post('register', { email, password, name });
      userRegister = response;
    } catch (error) {
      userRegister = error;
    }

    if (userRegister.response) {
      return setErrorMessage(userRegister.response.statusText);
    }

    const { token, name: userName, email: userEmail, role, id } = userRegister.data;

    setLocalStorage('user', { token, name: userName, email: userEmail, role, id });

    history.push('customer/products');
  };

  return (
    <div className="container-login-register">
      <div className="div-logotipo-login-register">
        <img className="logotipo-login-register" src={ Logotipo } alt="logotipo" />
      </div>
      <h1 className="title-login">Seja bem-vindo!</h1>
      <form className="form-login-register">
        <label className="label-login-register" htmlFor="name">
          <input
            className="input-login-register"
            type="text"
            id="name"
            placeholder="Nome"
            data-testid="common_register__input-name"
            onChange={ ({ target }) => setName(target.value) }
          />
        </label>

        <label className="label-login-register" htmlFor="email">
          <input
            className="input-login-register"
            type="email"
            id="email"
            placeholder="E-mail"
            data-testid="common_register__input-email"
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </label>

        <label className="label-login-register" htmlFor="password">
          <input
            className="input-login-register"
            type="password"
            id="password"
            placeholder="Senha"
            data-testid="common_register__input-password"
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </label>

        <button
          className="button-login"
          type="button"
          data-testid="common_register__button-register"
          disabled={ isDisabled }
          onClick={ register }
        >
          Cadastrar
        </button>
      </form>

      {
        errorMessage && (
          <span
            className="span-login-register"
            data-testid="common_register__element-invalid_register"
          >
            Usuário já cadastrado
          </span>
        )
      }
    </div>
  );
}

export default Register;
