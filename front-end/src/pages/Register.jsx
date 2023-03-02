import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { post } from '../utils/api';
import { setLocalStorage } from '../utils/storage';

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

    const { token, name: userName, email: userEmail, role } = userRegister.data;

    setLocalStorage('user', { token, name: userName, email: userEmail, role });

    history.push('customer/products');
  };

  return (
    <div>
      <form>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            data-testid="common_register__input-name"
            onChange={ ({ target }) => setName(target.value) }
          />
        </label>

        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            data-testid="common_register__input-email"
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </label>

        <label htmlFor="password">
          Password
          <input
            type="password"
            id="password"
            data-testid="common_register__input-password"
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </label>

        <button
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
          <span data-testid="common_login__element-invalid_register">
            Usuário já cadastrado
          </span>
        )
      }
    </div>
  );
}

export default Register;
