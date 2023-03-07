import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import customerContext from '../context/CustomerContext';
import '../styles/components/ProductCard.css';

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
    <div className="product-card-container">
      <div className="container-img-product-card">
        <img
          src={ urlImage }
          alt={ name }
          data-testid={ `customer_products__img-card-bg-image-${id}` }
        />
      </div>

      <div className="container-infos-product-card">
        <span
          className="title-product-card"
          data-testid={ `customer_products__element-card-title-${id}` }
        >
          { name }
        </span>

        <div className="container-children-infos-product-card">
          <span
            className="price-product-card"
            data-testid={ `customer_products__element-card-price-${id}` }

          >
            { productPrice }
          </span>

          <div className="button-alter-qnt">
            <button
              className="button-modified-qnt button-down-qnt"
              type="button"
              onClick={ () => decrease() }
              data-testid={ `customer_products__button-card-rm-item-${id}` }
            >
              -
            </button>

            <input
              className="input-qnt"
              type="text"
              onChange={ handleChange }
              value={ quantity }
              data-testid={ `customer_products__input-card-quantity-${id}` }
            />

            <button
              className="button-modified-qnt button-up-qnt"
              type="button"
              onClick={ () => increase() }
              data-testid={ `customer_products__button-card-add-item-${id}` }
            >
              +
            </button>
          </div>
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
