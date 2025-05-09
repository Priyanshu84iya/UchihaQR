import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Attribution from './components/Attribution';
import reportWebVitals from './reportWebVitals';
import { verifyAuthorization, handleUnauthorizedAccess } from './utils/licenseProtection';

// Verify authorization before rendering the app
const authStatus = verifyAuthorization();

const root = ReactDOM.createRoot(document.getElementById('root'));

// Only render the app if authorized
if (authStatus.authorized) {
  root.render(
    <React.StrictMode>
      <App />
      <Attribution />
    </React.StrictMode>
  );
} else {
  // Handle unauthorized access
  handleUnauthorizedAccess();
}

// Learn more: https://bit.ly/CRA-vitals
reportWebVitals();