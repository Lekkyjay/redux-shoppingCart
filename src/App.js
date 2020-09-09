import React, { useState } from 'react';
import Products from './components/Products'
import Filter from './components/Filter'
import Cart from './components/Cart'
import store from './store'
import { Provider } from 'react-redux';

function App() {
  
  const createOrder = (order) => {
    alert("Need to save order for " + order.name);
  };
    
  return (
    <Provider store={store}>
      <div className="grid-container">
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter />
              <Products />
            </div>
            <div className="sidebar">
              <Cart createOrder={createOrder} />
            </div>
          </div>
        </main>
        <footer>All right is reserved.</footer>
      </div>
    </Provider>
  );
}

export default App;
