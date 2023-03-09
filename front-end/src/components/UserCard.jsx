import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { destroy } from '../utils/api';
import { getLocalStorage } from '../utils/storage';
//import '../styles/components/UserCard.css';
import usersContext from '../context/UsersContext';

function UserCard({ user }) {
  const { users, setUsers } = useContext(usersContext)

  const { id, name, email, role } = user;

  const { token } = getLocalStorage('user');
  
  const filterUsersArray  = () => users.filter((user) => user.id !== id);

  const deleteUser = async () => {
    const response = await destroy(`user/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    const updatedUsers =  filterUsersArray(users);
    setUsers([...updatedUsers]);
  };

  return (
    <div className="User-card-container">
      <div className="container-infos-User-card">
        <span
          className="title-User-card"
          data-testid={ `customer_Users__element-card-title-${id}` }
        >
          { name }
        </span>

        <div className="container-children-infos-User-card">
          <span
            className="price-User-card"
            data-testid={ `customer_Users__element-card-price-${id}` }

          >
            { email }
          </span>
          
          <span
            className="price-User-card"
            data-testid={ `customer_Users__element-card-price-${id}` }

          >
            { role }
          </span>

          <div className="button-alter-qnt">
            <button
              className="button-modified-qnt button-down-qnt"
              type="button"
              onClick={ () => deleteUser() }
              data-testid={ `customer_Users__button-card-rm-item-${id}` }
            >
              Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

UserCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserCard;
