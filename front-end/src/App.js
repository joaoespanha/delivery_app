import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import CustomerProducts from './pages/CustomerProducts';
import CustomerProvider from './context/CustomerProvider';
import Checkout from './pages/Checkout';
import CustomerOrders from './pages/CustomerOrders';
import CustomerOrderDetails from './pages/CustomerOrderDetails';
import SellerOrders from './pages/SellerOrders';

function App() {
  return (
    <CustomerProvider>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route path="/login" component={ Login } />
        <Route path="/register" component={ Register } />
        <Route exact path="/customer/products" component={ CustomerProducts } />
        <Route exact path="/customer/checkout" component={ Checkout } />
        <Route exact path="/customer/orders" component={ CustomerOrders } />
        <Route exact path="/customer/orders/:id" component={ CustomerOrderDetails } />
        <Route exact path="/seller/orders" component={ SellerOrders } />
        <Route exact path="/seller/orders/:id" component={ SellerOrders } />
      </Switch>
    </CustomerProvider>
  );
}

export default App;
