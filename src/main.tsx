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
        duration: 3500,
        style: {
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(8px)',
          color: '#1c1917',
          borderRadius: '16px',
          border: '1px solid rgba(28, 25, 23, 0.08)',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          fontSize: '14px',
          fontWeight: '500',
          padding: '12px 22px',
          minWidth: '280px',
          maxWidth: '400px',
          fontFamily: '"Outfit", sans-serif',
        },
        success: {
          iconTheme: {
            primary: '#E41F66',
            secondary: '#ffffff',
          },
          style: {
            border: '1px solid rgba(228, 31, 102, 0.15)',
          }
        },
        error: {
          iconTheme: {
            primary: '#ef4444',
            secondary: '#ffffff',
          },
          style: {
            border: '1px solid rgba(239, 68, 68, 0.15)',
          }
        }
      }}
    />
  </>
)
