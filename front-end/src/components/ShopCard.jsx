import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import customerContext from '../context/CustomerContext';

function ShopCard({ item, i }) {
  const { shop, setShop } = useContext(customerContext);

  const remove = () => {
    const newArray = shop.filter((product) => product.id !== item.id);
    setShop(newArray);
  };

  return (
    <div>
      <span data-testid={ `customer_checkout__element-order-table-item-number-${i}` }>
        {
          i + 1
        }
      </span>

      <span data-testid={ `customer_checkout__element-order-table-name-${i}` }>
        {
          item.name
        }
      </span>

      <span data-testid={ `customer_checkout__element-order-table-quantity-${i}` }>
        {
          item.quantity
        }
      </span>

      <span data-testid={ `customer_checkout__element-order-table-unit-price-${i}` }>
        {
          item.price.replace(/\./ig, ',')
        }
      </span>

      <span data-testid={ `customer_checkout__element-order-table-sub-total-${i}` }>
        {
          (Number(item.price) * Number(item.quantity)).toFixed(2).replace(/\./ig, ',')
        }
      </span>

      <button
        type="button"
        data-testid={ `customer_checkout__element-order-table-remove-${i}` }
        onClick={ remove }
      >
        Remover
      </button>
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
