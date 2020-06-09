import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Router from './Router'
import AppProvider from './context'
ReactDOM.render(
  <AppProvider>
    <Router />
  </AppProvider>,
  document.getElementById('root')
);


serviceWorker.register();
