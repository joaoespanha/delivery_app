/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { get } from '../utils/api';
import { getLocalStorage } from '../utils/storage';
import CustomerNavBar from '../components/CustomerNavBar';
import DetailsLabel from '../components/DetailsLabel';
import ShopCard from '../components/ShopCard';
import TotalPrice from '../components/TotalPrice';
import '../styles/pages/CustomerOrderDetails.css';

function CustomerOrderDetails() {
  const [sale, setSale] = useState({});
  const [pŕoducts, setProducts] = useState([]);

  const { pathname } = useLocation();

  const saleId = pathname.split('/')[3];

  const { token } = getLocalStorage('user');
  const getSale = async () => {
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
          <section className="section-customer-order-details">
            <h2>Detalhe do Pedido</h2>
            <DetailsLabel sale={ sale } />
            <div className="container-products-checkout">
              <div className="bar-title-shop-card bar-title-shop-card-details">
                <div className="index-item-shop-card-title">Item</div>
                <div className="name-item-shop-card-title">Descrição</div>
                <div className="qnt-item-shop-card-title">Quantidade</div>
                <div className="value-item-shop-card-title">Valor Unitário</div>
                <div className="value-total-item-shop-card-title">Sub-total</div>
              </div>

              {
                pŕoducts.map((product, i) => (
                  <ShopCard item={ product } i={ i } key={ `${i}${product.id}` } />
                ))
              }
            </div>
            <div className="container-total-price">
              <TotalPrice total={ sale.totalPrice } />
            </div>
          </section>
        )
      }
    </main>
  );
}

export default CustomerOrderDetails;
