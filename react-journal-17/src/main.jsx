import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Store from './store/Store';
import { JournalApp } from './JournalApp';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
   <Provider store={Store}>
    <BrowserRouter>
      <JournalApp />
    </BrowserRouter>
    </Provider> 
   
   //</React.StrictMode> 
)
