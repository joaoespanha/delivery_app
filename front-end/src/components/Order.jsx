import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/components/Order.css';

const DATE_SIZE = 10;

function Order({ order }) {
  const { id, saleDate, status, totalPrice, deliveryAddress, deliveryNumber } = order;

  const history = useHistory();
  const { pathname } = useLocation();

  const path = pathname.split('/');

  const checkIfIsSellerPath = path.includes('seller');

  const takesToDetails = () => {
    if (checkIfIsSellerPath) {
      return history.push(`/seller/orders/${id}`);
    }

    history.push(`/customer/orders/${id}`);
  };

  const testIdID = checkIfIsSellerPath ? `seller_orders__element-order-id-${id}`
    : `customer_orders__element-order-id-${id}`;

  const testIdStatus = checkIfIsSellerPath
    ? `seller_orders__element-delivery-status-${id}`
    : `customer_orders__element-delivery-status-${id}`;

  const testIdDate = checkIfIsSellerPath ? `seller_orders__element-order-date-${id}`
    : `customer_orders__element-order-date-${id}`;

  const testIdPrice = checkIfIsSellerPath ? `seller_orders__element-card-price-${id}`
    : `customer_orders__element-card-price-${id}`;

  return (
    <div
      onClick={ takesToDetails }
      aria-hidden="true"
      className="container-order"
    >
      <div className="container-customer-seller-order">
        <div className="div-id-order">
          <span data-testid={ testIdID }>
            {
              id
            }
          </span>
        </div>

        <div className="div-status-order">
          <span data-testid={ testIdStatus }>
            {
              status
            }
          </span>
        </div>

        <div className="div-date-value-order">
          <span
            data-testid={ testIdDate }
            className="span-date-order"
          >
            {
              saleDate.slice(0, DATE_SIZE).split('-').reverse().join('/')
            }
          </span>

          <span
            data-testid={ testIdPrice }
            className="span-total-price-order"
          >
            {
              totalPrice.replace(/\./ig, ',')
            }
          </span>
        </div>
      </div>

      <div className="adress-seller-orders">
        {
          checkIfIsSellerPath && (
            <span data-testid={ `seller_orders__element-card-address-${id}` }>
              {
                `${deliveryAddress}, ${deliveryNumber}`
              }
            </span>
          )
        }
      </div>
    </div>
  );
}

Order.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number.isRequired,
    saleDate: PropTypes.instanceOf(Date),
    status: PropTypes.string.isRequired,
    totalPrice: PropTypes.number.isRequired,
    deliveryAddress: PropTypes.number.isRequired,
    deliveryNumber: PropTypes.number.isRequired,
  }).isRequired,
};

export default Order;
