import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { patch } from '../utils/api';
import { getLocalStorage } from '../utils/storage';
import '../styles/components/DetailsLabel.css';

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

  const emTransito = 'Em Trânsito';
  const entregue = 'Entregue';
  const preparando = 'Preparando';
  const pendente = 'Pendente';

  let statusClass = '';
  switch (deliveryStatus) {
  case pendente:
    statusClass = 'gray-back';
    break;
  case preparando:
    statusClass = 'yellow-back';
    break;
  case emTransito:
    statusClass = 'blue-back';
    break;
  case entregue:
    statusClass = 'green-back';
    break;
  default:
    statusClass = '';
  }

  return (
    <div className="container-details-label">
      <span data-testid={ dataTestSaleID } className="number-pedido span-details-mobile">
        Pedido:
        {' '}
        { sale.id }
      </span>

      {
        checkPath && (
          <span
            data-testid="customer_order_details__element-order-details-label-seller-name"
            className="span-details-mobile"
          >
            P.Vend:
            {' '}
            { sale.seller.name }
          </span>
        )
      }

      <span
        data-testid={ dataTestDate }
        className="date-details-label
       span-details-mobile"
      >
        { sale.saleDate.slice(0, DATE_SIZE).split('-').reverse().join('/') }
      </span>

      <span
        data-testid={ dataTestStatus }
        className={ `${statusClass} span-details-mobile` }
      >
        { deliveryStatus }

      </span>

      {
        checkPath && (
          <button
            className="button-delivery-check span-details-mobile"
            type="button"
            data-testid="customer_order_details__button-delivery-check"
            onClick={ () => changeStatus(entregue) }
            disabled={ deliveryStatus !== emTransito }
          >
            Marcar como entregue
          </button>
        )
      }

      {
        !checkPath && (
          <div>
            <button
              className="button-delivery-check"
              type="button"
              data-testid="seller_order_details__button-preparing-check"
              onClick={ () => changeStatus(preparando) }
              disabled={ deliveryStatus !== pendente }
            >
              Preparar Pedido
            </button>

            <button
              className="button-delivery-check"
              type="button"
              data-testid="seller_order_details__button-dispatch-check"
              onClick={ () => changeStatus(emTransito) }
              disabled={ deliveryStatus !== preparando }
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
