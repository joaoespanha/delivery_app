import React, { useState, useEffect } from 'react';
import { getLocalStorage } from '../utils/storage';
import { get } from '../utils/api';
import CustomerNavBar from '../components/CustomerNavBar';
import Order from '../components/Order';

function SellerOrders() {
  const [orders, setOrders] = useState([]);

  const { id, token } = getLocalStorage('user');
  const getOrders = async () => {
    const response = await get(`sales/seller/${id}`, {
      headers: {
        Authorization: token,
      },
    });

    setOrders([...response.data]);
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <main>
      <CustomerNavBar />

      <section>
        {
          orders.map((order, i) => (
            <Order order={ order } key={ `${order.id}-${i}` } />
          ))
        }
      </section>
    </main>
  );
}

export default SellerOrders;
