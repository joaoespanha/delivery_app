import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { destroy } from '../utils/api';
import { getLocalStorage } from '../utils/storage';
// import '../styles/components/UserCard.css';
import usersContext from '../context/UsersContext';

function UserCard({ user }) {
  const { users, setUsers } = useContext(usersContext);

  const { id, name, email, role, index } = user;

  const { token } = getLocalStorage('user');

  const filterUsersArray = () => users.filter((userPos) => userPos.id !== id);

  const deleteUser = async () => {
    await destroy(`user/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    const updatedUsers = filterUsersArray();
    setUsers([...updatedUsers]);
  };

  return (
    <div className="User-card-container">
      <div className="container-infos-User-card">

        <span
          className="title-User-card"
          data-testid={ `admin_manage__element-user-table-item-number-${index}` }
        >
          { `${index + 1}` }
        </span>

        <span
          className="title-User-card"
          data-testid={ `admin_manage__element-user-table-name-${index}` }
        >
          { name }
        </span>

        <div className="container-children-infos-User-card">
          <span
            className="price-User-card"
            data-testid={ `admin_manage__element-user-table-email-${index}` }

          >
            { email }
          </span>

          <span
            className="price-User-card"
            data-testid={ `admin_manage__element-user-table-role-${index}` }

          >
            { role }
          </span>

          <div className="button-alter-qnt">
            <button
              className="button-modified-qnt button-down-qnt"
              type="button"
              onClick={ () => deleteUser() }
              data-testid={ `admin_manage__element-user-table-remove-${index}` }
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
    index: PropTypes.number,
    id: PropTypes.number,
    name: PropTypes.string,
    role: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};

export default UserCard;
