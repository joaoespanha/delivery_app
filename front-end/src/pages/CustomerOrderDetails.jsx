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
  const [pŕoducts, setProducts] = useState([]);

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

    const items = response.data.products.map(({
      id,
      name,
      price,
      urlImage,
      SalesProducts: { quantity },
    }) => ({ id, name, price, urlImage, quantity }));

    setProducts(items);
  };

  useEffect(() => {
    getSale();
  }, []);

  return (
    <main>
      <CustomerNavBar />

      {
        sale.id && (
          <section>
            <DetailsLabel sale={ sale } />

            {
              pŕoducts.map((product, i) => (
                <ShopCard item={ product } i={ i } key={ `${i}${product.id}` } />
              ))
            }

            <TotalPrice total={ sale.totalPrice } />
          </section>
        )
      }
    </main>
  );
}

export default CustomerOrderDetails;
