import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import customerContext from '../context/CustomerContext';

function ShopCard({ item, i }) {
  const { shop, setShop } = useContext(customerContext);

  const { pathname } = useLocation();

  const checkCheckoutPath = pathname.split('/').includes('checkout');
  const checkCustomerPath = pathname.split('/').includes('customer');

  let dataTestNumber = `seller_order_details__element-order-table-item-number-${i}`;
  let dataTestName = `seller_order_details__element-order-table-name-${i}`;
  let dataTestQuantity = `seller_order_details__element-order-table-quantity-${i}`;
  let dataTestPrice = `seller_order_details__element-order-table-unit-price-${i}`;
  let dataTestSubTotal = `seller_order_details__element-order-table-sub-total-${i}`;

  if (checkCheckoutPath) {
    dataTestNumber = `customer_checkout__element-order-table-item-number-${i}`;
    dataTestName = `customer_checkout__element-order-table-name-${i}`;
    dataTestQuantity = `customer_checkout__element-order-table-quantity-${i}`;
    dataTestPrice = `customer_checkout__element-order-table-unit-price-${i}`;
    dataTestSubTotal = `customer_checkout__element-order-table-sub-total-${i}`;
  }

  if (checkCustomerPath) {
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
    <div>
      <span data-testid={ dataTestNumber }>
        {
          i + 1
        }
      </span>

      <span data-testid={ dataTestName }>
        {
          item.name
        }
      </span>

      <span data-testid={ dataTestQuantity }>
        {
          item.quantity
        }
      </span>

      <span data-testid={ dataTestPrice }>
        {
          item.price.replace(/\./ig, ',')
        }
      </span>

      <span data-testid={ dataTestSubTotal }>
        {
          (Number(item.price) * Number(item.quantity)).toFixed(2).replace(/\./ig, ',')
        }
      </span>

      {
        checkCheckoutPath && (
          <button
            type="button"
            data-testid={ `customer_checkout__element-order-table-remove-${i}` }
            onClick={ remove }
          >
            Remover
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
