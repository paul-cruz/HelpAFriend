import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AppProvider } from './state/app.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.css';


ReactDOM.render(
  <AppProvider>
    <App />
  </AppProvider>,
  document.getElementById('root')
);
