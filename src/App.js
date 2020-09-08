import React, { useState } from 'react';
import Products from './components/Products'
import Filter from './components/Filter'
import Cart from './components/Cart'
import store from './store'
import { Provider } from 'react-redux';

function App() {
  const [item, setItem] = useState({
    cartItems: localStorage.getItem("cartItems") ? 
      JSON.parse(localStorage.getItem("cartItems")) : [],
    size: "",
    sort: ""
  })

  const createOrder = (order) => {
    alert("Need to save order for " + order.name);
  };

  const removeFromCart = (product) => {
    const cartItems = item.cartItems.slice();
    setItem({ ...item,
      cartItems: cartItems.filter((x) => x._id !== product._id),
    });
    localStorage.setItem("cartItems", 
      JSON.stringify(item.cartItems.filter((x) => x._id !== product._id))
    );
  };

  const addToCart = (product) => {
    const cartItems = item.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach((cartItem) => {
      if (cartItem._id === product._id) {
        cartItem.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      cartItems.push({ ...product, count: 1 });
    }
    setItem({ ...item, cartItems });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }
  
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
              <Products addToCart={addToCart} />
            </div>
            <div className="sidebar">
              <Cart
                cartItems={item.cartItems}
                removeFromCart={removeFromCart}
                createOrder={createOrder}
              />
            </div>
          </div>
        </main>
        <footer>All right is reserved.</footer>
      </div>
    </Provider>
  );
}

export default App;
