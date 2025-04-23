/* global google */
import { useEffect } from 'react';



import { CssBaseline, radioClasses, ThemeProvider } from '@mui/material';
import { baselightTheme } from './theme/DefaultColors';
import { RouterProvider } from 'react-router-dom';
import Router from './routes/Router';

import { Provider } from 'react-redux';
import store from './store';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,hi,kn,ta,te,ml,gu,pa,ur,bn', // Add your desired languages here
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        'google_translate_element'
      );
    };
  }, []);

  const theme = baselightTheme;

  return (
    <>
      <div style={{ 
        position: 'absolute', 
        top: 20, 
        right: 20, 
        zIndex: 1000,
        backgroundColor: 'white',
        padding: '5px 10px',
        borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      
      }}>
        <div id="google_translate_element"></div>
      </div>

      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <ToastContainer />
          <CssBaseline />
          <RouterProvider router={Router} />
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
