/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { getLocalStorage } from '../utils/storage';
import { get } from '../utils/api';
import CustomerNavBar from '../components/CustomerNavBar';
import Order from '../components/Order';
import '../styles/pages/CustomerOrders.css';

function CustomerOrders() {
  const [orders, setOrders] = useState([]);

  const { id, token } = getLocalStorage('user');
  const getOrders = async () => {
    const response = await get(`sales/customer/${id}`, {
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
    <main className="main-customer-orders">
      <CustomerNavBar />

      <section className="section-customer-orders">
        {
          orders.map((order, i) => (
            <Order order={ order } key={ `${order.id}-${i}` } />
          ))
        }
      </section>
    </main>
  );
}

export default CustomerOrders;
