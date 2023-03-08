import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import customerContext from '../context/CustomerContext';
import '../styles/components/ShopCard.css';

function ShopCard({ item, i }) {
  const { shop, setShop } = useContext(customerContext);

  const { pathname } = useLocation();

  const checkSellerPath = pathname.split('/').includes('seller');
  const checkCheckoutPath = pathname.split('/').includes('checkout');
  const checkCustomerPath = pathname.split('/').includes('customer');

  let dataTestNumber = `customer_checkout__element-order-table-item-number-${i}`;
  let dataTestName = `customer_checkout__element-order-table-name-${i}`;
  let dataTestQuantity = `customer_checkout__element-order-table-quantity-${i}`;
  let dataTestPrice = `customer_checkout__element-order-table-unit-price-${i}`;
  let dataTestSubTotal = `customer_checkout__element-order-table-sub-total-${i}`;

  if (checkSellerPath) {
    dataTestNumber = `seller_order_details__element-order-table-item-number-${i}`;
    dataTestName = `seller_order_details__element-order-table-name-${i}`;
    dataTestQuantity = `seller_order_details__element-order-table-quantity-${i}`;
    dataTestPrice = `seller_order_details__element-order-table-unit-price-${i}`;
    dataTestSubTotal = `seller_order_details__element-order-table-sub-total-${i}`;
  }

  if (checkCustomerPath && !checkCheckoutPath) {
    dataTestNumber = `customer_order_details__element-order-table-item-number-${i}`;
    dataTestName = `customer_order_details__element-order-table-name-${i}`;
    dataTestQuantity = `customer_order_details__element-order-table-quantity-${i}`;
    dataTestPrice = `customer_order_details__element-order-table-unit-price-${i}`;
    dataTestSubTotal = `customer_order_details__element-order-table-sub-total-${i}`;
  }

  const remove = () => {
    const newArray = shop.filter((product) => product.id !== item.id);
    setShop(newArray);
  };

  return (
    <div className="div-shop-card">
      <div className="index-item-shop-card" data-testid={ dataTestNumber }>
        {
          i + 1
        }
      </div>

      <div className="name-item-shop-card" data-testid={ dataTestName }>
        {
          item.name
        }
      </div>

      <div className="qnt-item-shop-card" data-testid={ dataTestQuantity }>
        {
          item.quantity
        }
      </div>

      <div className="value-item-shop-card" data-testid={ dataTestPrice }>
        <span className="span-shopcard">

          {
            item.price.replace(/\./ig, ',')
          }
        </span>
      </div>

      <div className="value-total-item-shop-card" data-testid={ dataTestSubTotal }>
        <span className="span-shopcard">
          {
            (Number(item.price) * Number(item.quantity)).toFixed(2).replace(/\./ig, ',')
          }
        </span>
      </div>

      {
        checkCheckoutPath && (
          <button
            className="btn-remove-item-shop-card"
            type="button"
            data-testid={ `customer_checkout__element-order-table-remove-${i}` }
            onClick={ remove }
          >
            <span className="span-btn-shop-card"> ❌</span>
          </button>
        )
      }
    </div>
  );
}

ShopCard.propTypes = {
  i: PropTypes.number.isRequired,
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
};

export default ShopCard;
