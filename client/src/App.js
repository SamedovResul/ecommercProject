import React,{useState,useEffect,useContext} from 'react';
import { BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Header from './components/headers/Header'
import MainPages from './components/mainpages/Pages'
import Products from './components/mainpages/products/Products';
import DetailProduct from './components/mainpages/detailProduct/DetailProduct';
import OrderHistory from './components/mainpages/history/OrderHistory';
import OrderDetails from './components/mainpages/history/OrderDetails';
import Cart from './components/mainpages/cart/Cart';
import NotFound from './components/mainpages/utils/not_found/NotFound';
import Categories from './components/mainpages/categories/Categories';
import CreateProduct from './components/mainpages/createProduct/CreateProduct';
import {GlobalState} from './GlobalState'
import Login from './components/mainpages/auth/Login';
import Register from './components/mainpages/auth/Register';
import Order from './components/mainpages/cart/order';
import { useSelector } from 'react-redux';

const App = () => {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged
  const [isAdmin] = state.userAPI.isAdmin
  // console.log(state2)
  return (
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route path="/" exact component={Products} />
            <Route path="/detail/:id" exact component={DetailProduct} />

            <Route path="/login" exact component={isLogged ? NotFound : Login} />
            <Route path="/register" exact component={isLogged ? NotFound : Register} />

            <Route path="/category" exact component={isAdmin ? Categories : NotFound} />
            <Route path="/create_product" exact component={isAdmin ? CreateProduct : NotFound} />
            <Route path="/edit_product/:id" exact component={isAdmin ? CreateProduct : NotFound} />

            <Route path="/history" exact component={isLogged ? OrderHistory : NotFound} />
            <Route path="/history/:id" exact component={isLogged ? OrderDetails : NotFound} />
            <Route path="/Order" exact component={isLogged ? Order : NotFound} />

            <Route path="/cart" exact component={Cart} />

            <Route path="*" exact component={NotFound} />
          </Switch>
        </div>
      </Router>
  );
}

export default App;
