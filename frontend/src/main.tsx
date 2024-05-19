import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material'
import { Toaster } from 'react-hot-toast'

import axios from 'axios'
axios.defaults.baseURL = 'https://api.dinogpt.site/api/v1';
axios.defaults.withCredentials = true;

import './index.css'
import { AuthProvider } from './context/AuthContext.tsx'

const theme = createTheme({typography: {
    fontFamily: 'Roboto Slab, sarif',
    allVariants: {color: 'white'}
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Toaster position='top-center' />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
)
