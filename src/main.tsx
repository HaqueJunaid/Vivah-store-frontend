import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')!).render(
  <>
    <App />
    <Toaster 
      position='bottom-right'
      toastOptions={{
        className: '',
        duration: 3000,
        style: {
          background: '#1c1917',
          color: '#fafaf9',
          borderRadius: '0px',
          border: '1px solid #2e2a24',
          fontSize: '11px',
          letterSpacing: '0.07em',
          textTransform: 'uppercase',
          fontWeight: '500',
          padding: '10px 16px',
          minWidth: '220px',
          maxWidth: '300px',
          fontFamily: '"Outfit", sans-serif',
        },
        success: {
          iconTheme: {
            primary: '#E41F66',
            secondary: '#fafaf9',
          },
          style: {
            border: '1px solid rgba(228, 31, 102, 0.25)',
          }
        },
        error: {
          iconTheme: {
            primary: '#ef4444',
            secondary: '#fafaf9',
          },
          style: {
            border: '1px solid rgba(239, 68, 68, 0.25)',
          }
        }
      }}
    />
  </>
)
