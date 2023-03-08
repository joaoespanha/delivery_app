import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getLocalStorage, clearLocalStorage } from '../utils/storage';
import Logotipo from '../assets/images/logoHeader.svg';
import Logout from '../assets/images/botaoLogout.svg';
import '../styles/components/CustomerNavBar.css';

function CustomerNavBar() {
  const [name, setName] = useState('');

  const history = useHistory();

  useEffect(() => {
    const user = getLocalStorage('user');

    const { name: userName } = user;

    setName(userName);
  }, []);

  const logOut = () => {
    clearLocalStorage();

    history.push('/');
  };

  return (
    <nav className="header-container">
      <div className="div-links-header-left">
        <img src={ Logotipo } alt="logotipo" className="logotipo-header" />
        <Link
          to="/customer/products"
          data-testid="customer_products__element-navbar-link-products"
          className="links-header"
        >
          Produtos
        </Link>
        <Link
          to="/customer/orders"
          data-testid="customer_products__element-navbar-link-orders"
          className="links-header"
        >
          Meus Pedidos
        </Link>
      </div>

      <div className="div-links-header-right">
        <span
          data-testid="customer_products__element-navbar-user-full-name"
          className="span-header"
        >
          { name }
        </span>

        <button
          type="button"
          onClick={ () => logOut() }
          data-testid="customer_products__element-navbar-link-logout"
          className="button-header"
        >
          <img src={ Logout } alt="logout" />
        </button>
      </div>
    </nav>
  );
}

export default CustomerNavBar;
