import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { post, get } from '../utils/api';
import { getLocalStorage } from '../utils/storage';
import customerContext from '../context/CustomerContext';
import CustomerNavBar from '../components/CustomerNavBar';
import ShopCard from '../components/ShopCard';
import TotalPrice from '../components/TotalPrice';
import '../styles/pages/Checkout.css';

function Checkout() {
  const { shop, setShop } = useContext(customerContext);
  const [sellers, setSellers] = useState([]);
  const [seller, setSeller] = useState(2);
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');

  const history = useHistory();

  const total = shop
    .reduce((acc, product) => acc + (Number(product.price) * Number(product.quantity)), 0)
    .toFixed(2);

  const { token, id: userId } = getLocalStorage('user');
  const getSellers = async () => {
    const response = await get('user/search?role=seller', {
      headers: {
        Authorization: token,
      },
    });

    setSellers([...response.data]);
  };

  useEffect(() => {
    getSellers();
  });

  const buy = async () => {
    const date = new Date(Date.now()).toISOString();

    const response = await post('sales', {
      userId,
      sellerId: seller,
      totalPrice: total,
      deliveryAddress: address,
      deliveryNumber: number,
      saleDate: date,
      status: 'Pendente',
      products: shop.map(({ id: productId, quantity }) => ({ id: productId, quantity })),
    }, {
      headers: {
        Authorization: token,
      },
    });

    setShop([]);
    history.push(`/customer/orders/${response.data.id}`);
  };

  return (
    <main>
      <CustomerNavBar />
      <div className="title-checkout">
        <h2 className="checkout-title">Finalizar pedido</h2>
      </div>

      <div className="container-shop-card">
        <div className="container-products-checkout">
          <div className="bar-title-shop-card">
            <div className="index-item-shop-card-title">Item</div>
            <div className="name-item-shop-card-title">Descrição</div>
            <div className="qnt-item-shop-card-title">Quantidade</div>
            <div className="value-item-shop-card-title">Valor Unitário</div>
            <div className="value-total-item-shop-card-title">Sub-total</div>
            <div className="btn-remove-item-shop-card-title">Remover item</div>
          </div>
          {
            shop.map((product, i) => (
              <ShopCard item={ product } i={ i } key={ `${i}${product.id}` } />
            ))
          }
        </div>
        <div className="container-total-price">
          <TotalPrice total={ total } className="div-total-price" />
        </div>
      </div>

      <div className="title-checkout">
        <h2>Detalhes e Endereço da entrega</h2>
      </div>

      <form className="container-form-checkout">
        <label htmlFor="seller">
          <select
            name="seller"
            id="seller"
            data-testid="customer_checkout__select-seller"
            value={ seller }
            onChange={ ({ target }) => setSeller(target.value) }
          >
            {
              sellers
                .map((sell, i) => (
                  <option key={ `${i}-${sell.name}` } value={ sell.id }>
                    { sell.name }
                  </option>))
            }
          </select>
        </label>

        <label htmlFor="address">
          <input
            type="text"
            name="address"
            id="address"
            value={ address }
            data-testid="customer_checkout__input-address"
            onChange={ ({ target }) => setAddress(target.value) }
          />
        </label>

        <label htmlFor="number">
          <input
            type="text"
            name="number"
            id="number"
            value={ number }
            data-testid="customer_checkout__input-address-number"
            onChange={ ({ target }) => setNumber(target.value.toString()) }
          />
        </label>

        <button
          type="button"
          data-testid="customer_checkout__button-submit-order"
          onClick={ buy }
        >
          Finalizar
        </button>
      </form>
    </main>
  );
}

export default Checkout;
