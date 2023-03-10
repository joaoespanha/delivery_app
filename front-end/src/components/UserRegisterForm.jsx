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

  const possibleRoles = ['seller', 'customer', 'administrator'];

  const { token } = getLocalStorage('user');

  const registerUser = async () => {
    const userToBeCreated = { name, email, password, role };
    const createdUser = await post('register', userToBeCreated, {
      headers: {
        Authorization: token,
      },
    });
    setUsers([...users, createdUser]);
  };
  return (
    <form>
      <label htmlFor="name">
        <input
          type="text"
          name="name"
          id="name"
          value={ name }
          data-testid="customer_checkout__input-address"
          onChange={ ({ target }) => setName(target.value) }
        />
      </label>
      <label htmlFor="email">
        <input
          type="text"
          name="email"
          id="email"
          value={ email }
          data-testid="customer_checkout__input-address"
          onChange={ ({ target }) => setEmail(target.value) }
        />
      </label>
      <label htmlFor="password">
        <input
          type="text"
          name="password"
          id="password"
          value={ password }
          data-testid="customer_checkout__input-address"
          onChange={ ({ target }) => setPassword(target.value) }
        />
      </label>

      <label htmlFor="role">
        <select
          name="role"
          id="role"
          data-testid="customer_checkout__select-seller"
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
          onClick={ registerUser }
          // data-testid={ `customer_Users__button-card-rm-item-${id}` }
        >
          create
        </button>
      </div>
    </form>
  );
}

export default UserRegisterForm;
