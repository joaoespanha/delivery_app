import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { get } from '../utils/api';
import { getLocalStorage } from '../utils/storage';
import CustomerNavBar from '../components/CustomerNavBar';
import ProductCard from '../components/ProductCard';
import customerContext from '../context/CustomerContext';
import '../styles/pages/CustomerProducts.css';

function CustomerProducts() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const history = useHistory();

  const { shop } = useContext(customerContext);

  const getProducts = async () => {
    const { token } = getLocalStorage('user');
    const response = await get('products', {
      headers: {
        Authorization: token,
      },
    });

    const items = response.data;
    setProducts([...items]);
  };

  useEffect(() => {
    if (shop.length) {
      const totalValue = Number(shop
        .reduce((acc, { price, quantity }) => acc + (price * quantity), 0));

      return setTotal(totalValue.toFixed(2));
    }

    setTotal(0);
  }, [shop]);

  useEffect(() => {
    getProducts();
  }, []);

  const totalValue = total.toString().replace(/\./ig, ',');

  return (
    <main>
      <CustomerNavBar />
      <div>
        {
          products.map((product, i) => (
            <ProductCard item={ product } key={ `${product.name}-${i}` } />
          ))
        }

        <button
          type="button"
          data-testid="customer_products__button-cart"
          onClick={ () => history.push('checkout') }
          disabled={ total === 0 }
        >
          <span data-testid="customer_products__checkout-bottom-value">
            {
              totalValue
            }
          </span>
        </button>
      </div>
    </main>
  );
}

export default CustomerProducts;
