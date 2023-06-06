import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {DataProvider} from "./GlobalState";
import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import Data from './redux/combine';
import thunk from 'redux-thunk'; 


const store = createStore(Data, compose(applyMiddleware(thunk)))
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <DataProvider>
        <App />
      </DataProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


