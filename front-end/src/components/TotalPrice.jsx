import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

function TotalPrice({ total }) {
  const { pathname } = useLocation();

  const checkPath = pathname.split('/').includes('checkout');

  const dataTest = checkPath ? 'customer_checkout__element-order-total-price'
    : 'customer_order_details__element-order-total-price';

  return (
    <span data-testid={ dataTest }>
      {
        total.replace(/\./ig, ',')
      }
    </span>
  );
};

TotalPrice.propTypes = {
  total: PropTypes.number.isRequired,
};

export default TotalPrice;
