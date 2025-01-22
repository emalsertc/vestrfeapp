import React from 'react';
import ReactDOM from 'react-dom/client';
import { App as KonstaApp } from 'konsta/react';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <KonstaApp theme="ios">
      <App />
    </KonstaApp>
  </React.StrictMode>
); 