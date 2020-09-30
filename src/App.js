import React from 'react';
import Products from './components/Products'
import Filter from './components/Filter'
import Cart from './components/Cart'
import store from './store'
import { Provider } from 'react-redux';
import { Link, BrowserRouter, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'
import AdminPage from './pages/AdminPage'

function App() {
    
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="grid-container">
          <header>
            <Link to="/">Dress Shop</Link>
            <Link to="/admin">Admin</Link>
          </header>
          <main>
            <Route exact path="/" component={HomePage} />
            <Route path="/admin" component={AdminPage} />
          </main>
          <footer>All right is reserved.</footer>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
