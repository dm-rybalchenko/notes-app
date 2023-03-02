import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './app/App';
import rootStore from './store';

import './style/reset.scss';
import './style/common.scss';
import './style/fonts.scss';
import './style/select.scss';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
//   <React.StrictMode>
    <Provider store={rootStore}>
      <App />
    </Provider>
//   </React.StrictMode>,
);
