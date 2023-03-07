import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { post, get } from '../utils/api';
import { getLocalStorage } from '../utils/storage';
import customerContext from '../context/CustomerContext';
import CustomerNavBar from '../components/CustomerNavBar';
import ShopCard from '../components/ShopCard';
import TotalPrice from '../components/TotalPrice';

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
    const response = await post('sales', {
      userId,
      sellerId: seller,
      totalPrice: total,
      deliveryAddress: address,
      deliveryNumber: number,
      saleDate: new Date(),
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

      <span>Finalizar pedido</span>

      <div>
        {
          shop.map((product, i) => (
            <ShopCard item={ product } i={ i } key={ `${i}${product.id}` } />
          ))
        }
      </div>

      <TotalPrice total={ total } />

      <span>Detalhes e Endereço da entrega</span>

      <form>
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
