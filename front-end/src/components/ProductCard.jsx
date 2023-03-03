import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import customerContext from '../context/CustomerContext';

function ProductCard({ item }) {
  const { shop, setShop } = useContext(customerContext);

  const [quantity, setQuatity] = useState(0);

  const { id, name, price, urlImage } = item;

  const checkItem = () => shop.some(({ id: itemId }) => id === itemId);

  const increase = () => {
    setQuatity(quantity + 1);

    if (checkItem()) {
      const newArray = shop.map((product) => {
        if (product.id === id) {
          return { ...product, quantity: quantity + 1 };
        }

        return product;
      });

      return setShop(newArray);
    }

    const newArray = [...shop, { quantity: quantity + 1, id, name, price }];
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
      const newArray = shop.map((product) => {
        if (product.id === id) {
          return { ...product, quantity: quantity - 1 };
        }

        return product;
      });

      return setShop(newArray);
    }
  };

  const handleChange = ({ target }) => {
    setQuatity(Number(target.value));

    if (Number(target.value) !== 0 && checkItem()) {
      const newArray = shop.map((product) => {
        if (product.id === id) {
          return { ...product, quantity: Number(target.value) };
        }
        return product;
      });

      return setShop(newArray);
    }

    if (Number(target.value) !== 0 && !checkItem()) {
      const newArray = [...shop, { quantity: target.value, id, name, price }];
      return setShop(newArray);
    }

    const newArray = shop.filter((product) => product.id !== id);
    setShop(newArray);
  };

  const productPrice = price.replace(/\./ig, ',');

  return (
    <div>
      <div>
        <span data-testid={ `customer_products__element-card-price-${id}` }>
          { productPrice }
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
          <button
            type="button"
            onClick={ () => decrease() }
            data-testid={ `customer_products__button-card-rm-item-${id}` }
          >
            -
          </button>

          <input
            type="text"
            onChange={ handleChange }
            value={ quantity }
            data-testid={ `customer_products__input-card-quantity-${id}` }
          />

          <button
            type="button"
            onClick={ () => increase() }
            data-testid={ `customer_products__button-card-add-item-${id}` }
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    urlImage: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;
