import React, { useEffect, useState } from 'react';
import { Link, BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from './components/Login';
import Register from './components/Register';
import store from './store'
import HomePage from './pages/HomePage'
import AdminPage from './pages/AdminPage'
import UserContext from './context/UserContext';
import AuthNavs from './components/AuthNavs';

function App() {
  const [authUser, setAuthUser] = useState('')
  
  useEffect(() => {
    const userId = localStorage.getItem('shopping-user')
    console.log('userId:', userId);
    if (userId == null) {
      localStorage.setItem('shopping-user', '')
      setAuthUser(localStorage.getItem('shopping-user'))
    }
    setAuthUser(localStorage.getItem('shopping-user'))
  }, [])

  return (
    <Provider store={store}>
      <BrowserRouter>
        <UserContext.Provider value={{ authUser, setAuthUser }}>
          <div className="grid-container">
            <header>
              <Link to="/">Dress Shop</Link>
              <AuthNavs />
            </header>
            <main>
              <Route exact path="/" component={HomePage} />
              <Route path="/admin" component={AdminPage} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </main>
            <footer>All right is reserved.</footer>
          </div>
        </UserContext.Provider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
