import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { destroy } from '../utils/api';
import { getLocalStorage } from '../utils/storage';
import '../styles/components/UserCard.css';
import usersContext from '../context/UsersContext';
import Delete from '../assets/images/delete.svg';

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
    <div className="container-infos-user-card">

      <div
        className="index-user-card"
        data-testid={ `admin_manage__element-user-table-item-number-${index}` }
      >
        { `${index + 1}` }
      </div>

      <div
        className="name-user-card"
        data-testid={ `admin_manage__element-user-table-name-${index}` }
      >
        { name }
      </div>
      <div
        className="email-user-card"
        data-testid={ `admin_manage__element-user-table-email-${index}` }

      >
        { email }
      </div>

      <div
        className="role-user-card"
        data-testid={ `admin_manage__element-user-table-role-${index}` }

      >
        { role }
      </div>

      <div className="button-alter-qnt">
        <button
          className="btn-remove-user-card"
          type="button"
          onClick={ () => deleteUser() }
          data-testid={ `admin_manage__element-user-table-remove-${index}` }
        >
          <span className="span-btn-shop-card">
            <img src={ Delete } alt="botão deletar" />
          </span>
        </button>
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
