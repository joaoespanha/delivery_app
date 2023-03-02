import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getLocalStorage, clearLocalStorage } from '../utils/storage';

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
    <nav>
      <div>
        <Link
          to="/customer/products"
          data-testid="customer_products__element-navbar-link-products"
        >
          Produtos
        </Link>
        <Link
          to="/customer/orders"
          data-testid="customer_products__element-navbar-link-orders"
        >
          Meus Pedidos
        </Link>
      </div>

      <div>
        <span
          data-testid="customer_products__element-navbar-user-full-name"
        >
          { name }
        </span>

        <button
          type="button"
          onClick={ () => logOut() }
          data-testid="customer_products__element-navbar-link-logout"
        >
          Sair
        </button>
      </div>
    </nav>
  );
}

export default CustomerNavBar;
