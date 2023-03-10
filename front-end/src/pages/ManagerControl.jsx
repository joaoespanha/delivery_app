import React, { useEffect, useContext } from 'react';
import { get } from '../utils/api';
import { getLocalStorage } from '../utils/storage';
import CustomerNavBar from '../components/CustomerNavBar';
import usersContext from '../context/UsersContext';
import UserCard from '../components/UserCard';
import UserRegisterForm from '../components/UserRegisterForm';
// import '../styles/pages/CustomerUsers.css';

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
      <div className="container-product-card">
        <div className="grid-product-card">
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
