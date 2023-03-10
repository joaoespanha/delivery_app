import React, { useContext, useState } from 'react';
import { post } from '../utils/api';
import usersContext from '../context/UsersContext';
import { getLocalStorage } from '../utils/storage';

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
    <div>
      <form>
        <label htmlFor="name">
          <input
            type="text"
            name="name"
            id="name"
            value={ name }
            data-testid="admin_manage__input-name"
            onChange={ ({ target }) => setName(target.value) }
          />
        </label>
        <label htmlFor="email">
          <input
            type="text"
            name="email"
            id="email"
            value={ email }
            data-testid="admin_manage__input-email"
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </label>
        <label htmlFor="password">
          <input
            type="text"
            name="password"
            id="password"
            value={ password }
            data-testid="admin_manage__input-password"
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </label>

        <label htmlFor="role">
          <select
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
        <div className="button-alter-qnt">
          <button
            className="button-modified-qnt button-down-qnt"
            type="button"
            disabled={ isDisabled }
            onClick={ registerUser }
            data-testid="admin_manage__button-register"
          >
            create
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
