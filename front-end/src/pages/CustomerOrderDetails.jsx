import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { get } from '../utils/api';
import { getLocalStorage } from '../utils/storage';
import CustomerNavBar from '../components/CustomerNavBar';
import DetailsLabel from '../components/DetailsLabel';
import ShopCard from '../components/ShopCard';
import TotalPrice from '../components/TotalPrice';

function CustomerOrderDetails() {
  const [sale, setSale] = useState({});

  const { pathname } = useLocation();

  const saleId = pathname.split('/')[3];

  const getSale = async () => {
    const { token } = getLocalStorage('user');
    const response = await get(`sales/${saleId}`, {
      headers: {
        Authorization: token,
      },
    });

    setSale(response.data);
  };

  useEffect(() => {
    getSale();
  }, []);

  return (
    <main>
      <CustomerNavBar />
      <DetailsLabel />
      {
        sale?.products.map((product, i) => (
          <ShopCard item={ product } i={ i } key={ `${i}${product.id}` } />
        ))
      }
      <TotalPrice />
    </main>
  );
}

export default CustomerOrderDetails;
