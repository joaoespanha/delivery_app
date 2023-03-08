import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { patch } from '../utils/api';
import { getLocalStorage } from '../utils/storage';

const DATE_SIZE = 10;

function DetailsLabel({ sale }) {
  const { pathname } = useLocation();
  const [deliveryStatus, setDeliveryStatus] = useState(sale.status);

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

    await patch(`sales/${sale.id}`, { status }, {
      headers: {
        Authorization: token,
      },
    });

    setDeliveryStatus(status);
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

      <span data-testid={ dataTestDate }>
        { sale.saleDate.slice(0, DATE_SIZE).split('-').reverse().join('/') }
      </span>

      <span data-testid={ dataTestStatus }>{ sale.status }</span>

      {
        checkPath && (
          <button
            type="button"
            data-testid="customer_order_details__button-delivery-check"
            onClick={ () => changeStatus('Entregue') }
            disabled={ deliveryStatus === 'Pendente' }
          >
            Marcar como entregue
          </button>
        )
      }

      {
        !checkPath && (
          <div>
            <button
              type="button"
              data-testid="seller_order_details__button-preparing-check"
              onClick={ () => changeStatus('Preparando') }
              disabled={ deliveryStatus !== 'Pendente' }
            >
              Preparar Pedido
            </button>

            <button
              type="button"
              data-testid="seller_order_details__button-dispatch-check"
              onClick={ () => changeStatus('Em Trânsito') }
              disabled={ deliveryStatus !== 'Preparando' }
            >
              Saiu para entrega
            </button>
          </div>
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
