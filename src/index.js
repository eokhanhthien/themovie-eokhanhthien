import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//Create Store redux
// import store from './redux/store';
import store from './reduxtoolkit/store';
import { Provider } from 'react-redux';


ReactDOM.render(
  <Provider store = {store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
