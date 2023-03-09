import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { get } from '../utils/api';
import { getLocalStorage } from '../utils/storage';
import CustomerNavBar from '../components/CustomerNavBar';
import usersContext from '../context/UsersContext';
import UserCard from '../components/UserCard';
// import '../styles/pages/CustomerUsers.css';

function ManagerControl() {
  const history = useHistory();
  const { users, setUsers } = useContext(usersContext);

  const { token } = getLocalStorage('user');

  const getUsers = async () => {
    const response = await get('user', {
      headers: {
        Authorization: token,
      },
    });

    const users = response.data;
    setUsers([...users]);
  };

  useEffect(() => {
    getUsers();
  }, [users]);

  return (
    <main>
      <CustomerNavBar />
      {/* <UserRegisterForm /> */}
      <div className="container-product-card">
        <div className="grid-product-card">
          {
            users.map((user, i) => (
              <UserCard user={ user } key={ `${user.email}-${i}` } />
            ))
          }
        </div>
      </div>
    </main>
  );
}

export default ManagerControl;
