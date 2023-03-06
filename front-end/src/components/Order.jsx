import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

function Order({ order }) {
  const { id, saleDate, status, totalPrice } = order;
  const history = useHistory();

  const takesToDetails = () => {
    history.push(`/customer/orders/${id}`);
  };

  return (
    <div onClick={ takesToDetails } aria-hidden="true">
      <span data-testid={ `customer_orders__element-order-id-${id}` }>
        {
          id
        }
      </span>

      <span data-testid={ `customer_orders__element-delivery-status-${id}` }>
        {
          status
        }
      </span>

      <span data-testid={ `customer_orders__element-order-date-${id}` }>
        {
          saleDate
        }
      </span>

      <span data-testid={ `customer_orders__element-card-price-${id}` }>
        {
          totalPrice
        }
      </span>
    </div>
  );
}

Order.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number.isRequired,
    saleDate: PropTypes.instanceOf(Date),
    status: PropTypes.string.isRequired,
    totalPrice: PropTypes.number.isRequired,
  }).isRequired,
};

export default Order;
