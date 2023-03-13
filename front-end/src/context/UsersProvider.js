import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import usersContext from './UsersContext';

function UsersProvider({ children }) {
  const [users, setUsers] = useState([]);

  const contextValues = {
    users,
    setUsers,
  };

  const memorizedContextValue = useMemo(() => contextValues, [users]);

  return (
    <usersContext.Provider value={ memorizedContextValue }>
      { children }
    </usersContext.Provider>
  );
}

UsersProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UsersProvider;
