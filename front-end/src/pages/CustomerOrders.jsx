import React, { useState, useEffect } from 'react';
import { getLocalStorage } from '../utils/storage';
import { get } from '../utils/api';
import CustomerNavBar from '../components/CustomerNavBar';
import Order from '../components/Order';

function CustomerOrders() {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    const { id, token } = getLocalStorage('user');
    const response = await get(`sales/${id}`, {
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
            <Order order={ order } i={ i } key={ `${order.id}-${i}` } />
          ))
        }
      </section>
    </main>
  );
}

export default CustomerOrders;
