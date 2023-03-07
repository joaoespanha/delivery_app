import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import customerContext from '../context/CustomerContext';

function ShopCard({ item, i }) {
  const { shop, setShop } = useContext(customerContext);

  const { pathname } = useLocation();

  const checkPath = pathname.split('/').includes('checkout');

  const dataTestNumber = checkPath
    ? `customer_checkout__element-order-table-item-number-${i}`
    : `customer_order_details__element-order-table-item-number-${i}`;

  const dataTestName = checkPath ? `customer_checkout__element-order-table-name-${i}`
    : `customer_order_details__element-order-table-name-${i}`;

  const dataTestQuantity = checkPath
    ? `customer_checkout__element-order-table-quantity-${i}`
    : `customer_order_details__element-order-table-quantity-${i}`;

  const dataTestPrice = checkPath
    ? `customer_checkout__element-order-table-unit-price-${i}`
    : `customer_order_details__element-order-table-unit-price-${i}`;

  const dataTestSubTotal = checkPath
    ? `customer_checkout__element-order-table-sub-total-${i}`
    : `customer_order_details__element-order-table-sub-total-${i}`;

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
        checkPath && (
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
