import React from 'react';
import { render } from 'react-dom';
import { Provider } from "react-redux";
import configureStore from './store/configureStore';
import SomeComponent from './components/SomeComponent/SomeComponent';
import './styles/styles.css';

const store = configureStore();

render(
  <Provider store={store}>
      <SomeComponent />
  </Provider>,
  document.getElementById('app')
);