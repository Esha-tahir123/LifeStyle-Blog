import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import { BrowserRouter } from 'react-router-dom';
import '../node_modules/bootstrap/js/dist/carousel.js';
import '../node_modules/bootstrap/js//dist/dropdown.js';
import '../node_modules/bootstrap/dist/js/bootstrap.js';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <App/>
  </BrowserRouter>
  
  

// import reportWebVitals from './reportWebVitals';

);

