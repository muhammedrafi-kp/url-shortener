import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App.tsx';
import { Provider } from 'react-redux';
import store from './redux/store.ts';
import CustomToaster from './components/CustomToaster.tsx';

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID as string}>
        <BrowserRouter>
          <CustomToaster />
          <App />
        </BrowserRouter>
      </GoogleOAuthProvider>
    </Provider>
  </StrictMode>,
)
