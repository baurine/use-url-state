import React from 'react'
import ReactDOM from 'react-dom/client'
import { UrlStateProvider } from '@baurine/use-url-state'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UrlStateProvider>
      <App />
    </UrlStateProvider>
  </React.StrictMode>
)
