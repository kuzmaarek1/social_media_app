import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/main.css';
import App from '@/App';
import AppProviders from '@/providers/AppProviders';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
);
