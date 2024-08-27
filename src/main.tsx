import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './assets/css/index.css'
import './i18n/i18n';
import {AuthProvider} from "./context/AuthProvider.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <BrowserRouter>
          <AuthProvider>
              <Routes>
                  <Route path="/*" element={<App />}/>
              </Routes>
          </AuthProvider>
      </BrowserRouter>
  </React.StrictMode>,
)
