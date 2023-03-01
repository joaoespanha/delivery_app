import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import customerContext from '../context/CustomerContext';

function ProductCard({ item }) {
  const { shop, setShop } = useContext(customerContext);

  const [quantity, setQuatity] = useState(0);

  const { id, name, price, urlImage } = item;

  const checkItem = () => shop.some(({ id: itemId }) => id === itemId);

  const settingNewArray = () => {
    const newArray = shop.map((product) => {
      if (product.id === id) {
        return { ...product, quantity };
      }

      return product;
    });

    return setShop(newArray);
  };

  const increase = () => {
    setQuatity(quantity + 1);

    if (checkItem()) {
      return settingNewArray();
    }

    const newArray = [...shop, { quantity, id, name, price }];
    setShop(newArray);
  };

  const decrease = () => {
    if (quantity === 1) {
      setQuatity(quantity - 1);

      const newArray = shop.filter((product) => product.id !== id);
      return setShop(newArray);
    }

    if (quantity > 0) {
      setQuatity(quantity - 1);
      return settingNewArray();
    }
  };

  return (
    <div>
      <div>
        <span data-testid={ `customer_products__element-card-price-${id}` }>
          { `R$ ${price}` }
        </span>

        <img
          src={ urlImage }
          alt={ name }
          data-testid={ `customer_products__img-card-bg-image-${id}` }
        />
      </div>

      <div>
        <span data-testid={ `customer_products__element-card-title-${id}` }>
          { name }
        </span>

        <div>
          <button type="button" onClick={ () => decrease() }> - </button>
          <span>{ quantity }</span>
          <button type="button" onClick={ () => increase() }> + </button>
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    urlImage: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;
