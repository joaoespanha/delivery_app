import React, { useEffect, useContext } from 'react';
import { get } from '../utils/api';
import { getLocalStorage } from '../utils/storage';
import CustomerNavBar from '../components/CustomerNavBar';
import usersContext from '../context/UsersContext';
import UserCard from '../components/UserCard';
import UserRegisterForm from '../components/UserRegisterForm';
import '../styles/pages/ManagerControl.css';

function ManagerControl() {
  const { users, setUsers } = useContext(usersContext);

  const { token } = getLocalStorage('user');

  const getUsers = async () => {
    const response = await get('user', {
      headers: {
        Authorization: token,
      },
    });

    const updatedUsers = response.data;
    setUsers([...updatedUsers]);
  };

  useEffect(() => {
    getUsers();
  }, [users]);

  return (
    <main>
      <CustomerNavBar />
      <UserRegisterForm />

      <div className="title-user">
        <h2 className="user-title">Lista de usuários</h2>
      </div>

      <div className="container-users-card">
        <div className="container-user-adm">
          <div className="bar-title-users-card">
            <div className="index-item-users-title">ID</div>
            <div className="name-item-users-title">Nome</div>
            <div className="email-item-users-title">E-mail</div>
            <div className="role-item-users-title">Categoria</div>
            <div className="btn-remove-item-users-title">Remover</div>
          </div>
          {
            users.map((user, index) => (
              <UserCard user={ { ...user, index } } key={ `${user.email}-${index}` } />
            ))
          }
        </div>
      </div>
    </main>
  );
}

export default ManagerControl;
