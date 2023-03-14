import React, { useContext, useState } from 'react';
import { post } from '../utils/api';
import usersContext from '../context/UsersContext';
import { getLocalStorage } from '../utils/storage';
import '../styles/components/UserRegisterForm.css';

function UserRegisterForm() {
  const { users, setUsers } = useContext(usersContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('seller');
  const [errorMessage, setErrorMessage] = useState('');

  const MINIMUM_PASSWORD_LENGTH = 6;
  const MINIMUM_NAME_LENGTH = 12;

  const possibleRoles = ['seller', 'customer', 'administrator'];

  const { token } = getLocalStorage('user');

  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const isDisabled = password.length < MINIMUM_PASSWORD_LENGTH
  || !emailRegex.test(email) || name.length < MINIMUM_NAME_LENGTH;

  const registerUser = async () => {
    let userRegister;

    const userToBeCreated = { name, email, password, role };
    try {
      const createdUser = await post('register', userToBeCreated, {
        headers: {
          Authorization: token,
        },
      });
      userRegister = createdUser;
      setErrorMessage('');
      setUsers([...users, createdUser]);
    } catch (error) {
      userRegister = error;
    }
    if (userRegister.response) {
      setErrorMessage(userRegister.response.statusText);
    }
  };
  return (
    <div className="container-user-register-form">
      <div className="title-users">
        <h2>Cadastrar novo usuário</h2>
      </div>
      <form className="container-form-users">
        <label
          htmlFor="name"
          className="item-label-users"
        >
          <input
            className="input-form-users"
            type="text"
            name="name"
            id="name"
            placeholder="Nome Completo"
            value={ name }
            data-testid="admin_manage__input-name"
            onChange={ ({ target }) => setName(target.value) }
          />
        </label>
        <label
          htmlFor="email"
          className="item-label-users"
        >
          <input
            className="input-form-users"
            type="email"
            name="email"
            id="email"
            placeholder="E-mail"
            value={ email }
            data-testid="admin_manage__input-email"
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </label>
        <label
          htmlFor="password"
          className="item-label-users"
        >
          <input
            className="input-form-users item-form-users"
            type="password"
            name="password"
            id="password"
            placeholder="Senha"
            value={ password }
            data-testid="admin_manage__input-password"
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </label>

        <label
          htmlFor="role"
          className="item-label-users"
        >
          <select
            className="select-role-users"
            name="role"
            id="role"
            data-testid="admin_manage__select-role"
            value={ role }
            onChange={ ({ target }) => setRole(target.value) }
          >
            {
              possibleRoles
                .map((rolePos, i) => (
                  <option key={ `${i}-${rolePos}` } value={ rolePos }>
                    { rolePos }
                  </option>))
            }
          </select>
        </label>
        <div className="">
          <button
            className="btn-submit-users"
            type="button"
            disabled={ isDisabled }
            onClick={ registerUser }
            data-testid="admin_manage__button-register"
          >
            Cadastrar
          </button>
        </div>
      </form>
      {
        errorMessage && (
          <span
            className="span-login-register"
            data-testid="admin_manage__element-invalid-register"
          >
            Usuário já cadastrado
          </span>
        )
      }
    </div>
  );
}

export default UserRegisterForm;
