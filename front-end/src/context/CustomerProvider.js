/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import customerContext from './CustomerContext';

function CustomerProvider({ children }) {
  const [shop, setShop] = useState([]);

  const contextValues = {
    shop,
    setShop,
  };

  const memorizedContextValue = useMemo(() => contextValues, [shop]);

  return (
    <customerContext.Provider value={ memorizedContextValue }>
      { children }
    </customerContext.Provider>
  );
}

CustomerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CustomerProvider;
