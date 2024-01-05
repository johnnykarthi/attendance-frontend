import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { EmployeeContext } from './context/EmployeeContext';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <EmployeeContext>
          <App />
        </EmployeeContext>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
