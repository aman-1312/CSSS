import React from 'react';
import './styles/index.css';
import App from './App';
import AlertContext from './context/AlertContext';
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <AlertContext>
        <App />
    </AlertContext>
);

