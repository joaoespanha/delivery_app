import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { patch } from '../utils/api';
import { getLocalStorage } from '../utils/storage';

function DetailsLabel({ sale }) {
  const { pathname } = useLocation();

  const checkPath = pathname.split('/').includes('customer');

  const dataTestSaleID = checkPath
    ? 'customer_order_details__element-order-details-label-order-id'
    : 'seller_order_details__element-order-details-label-order-id';

  const dataTestDate = checkPath
    ? 'customer_order_details__element-order-details-label-order-date'
    : 'seller_order_details__element-order-details-label-order-date';

  const dataTestStatus = checkPath
    ? 'customer_order_details__element-order-details-label-delivery-status'
    : 'seller_order_details__element-order-details-label-delivery-status';

  const changeStatus = async (status) => {
    const { token } = getLocalStorage('user');

    await patch(`sale/${sale.id}`, { status }, {
      headers: {
        Authorization: token,
      },
    });
  };

  return (
    <div>
      <span data-testid={ dataTestSaleID }>{ sale.id }</span>

      {
        checkPath && (
          <span
            data-testid="customer_order_details__element-order-details-label-seller-name"
          >
            { sale.seller.name }
          </span>
        )
      }

      <span data-testid={ dataTestDate }>{ sale.saleDate }</span>

      <span data-testid={ dataTestStatus }>{ sale.status }</span>

      {
        checkPath && (
          <button
            type="button"
            onClick={ () => changeStatus('Entregue') }
          >
            Marcar como entregue
          </button>
        )
      }
    </div>
  );
}

DetailsLabel.propTypes = {
  sale: PropTypes.shape({
    id: PropTypes.number.isRequired,
    seller: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    saleDate: PropTypes.instanceOf(Date),
    status: PropTypes.string.isRequired,
  }).isRequired,
};

export default DetailsLabel;
