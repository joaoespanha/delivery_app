import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { post } from '../utils/api';
import { setLocalStorage } from '../utils/storage';

const MINIMUM_PASSWORD_LENGTH = 6;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const isDisabled = password.length < MINIMUM_PASSWORD_LENGTH
  || !emailRegex.test(email);

  const login = async () => {
    const response = await post('login', { email, password });

    if (response.message) {
      return setErrorMessage(response.message);
    }

    setLocalStorage('token', response.token);

    const { role } = response;

    if (role === 'administrator') navigate('/admin/manage');
    if (role === 'seller') navigate('/seller/orders');

    navigate('/customer/products');
  };

  return (
    <div>
      <form>
        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            data-testid="common_login__input-email"
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </label>

        <label htmlFor="password">
          Password
          <input
            type="password"
            id="password"
            data-testid="common_login__input-password"
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </label>

        <button
          type="button"
          data-testid="common_login__button-login"
          disabled={ isDisabled }
          onClick={ login }
        >
          Login
        </button>

        <button type="button" data-testid="common_login__button-register">
          Ainda não tem conta
        </button>
      </form>

      {
        errorMessage && (
          <span data-testid="common_login__element-invalid-email">
            Email ou senha incorreta
          </span>
        )
      }
    </div>
  );
}

export default Login;
