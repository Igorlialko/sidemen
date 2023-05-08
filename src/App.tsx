import React, { useEffect } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AdminPage } from './pages/admin/admin';
import { HomePage } from './pages/home/home';
import { StreamPage } from './pages/stream/stream';

function App() {
  useEffect(() => {
    const resizable = () => {
      document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
    };

    window.addEventListener('resize', resizable);
    window.addEventListener('orientationchange', resizable);

    return () => {
      window.removeEventListener('resize', resizable);
      window.removeEventListener('orientationchange', resizable);
    };
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<HomePage />} />
          <Route path='admin' element={<AdminPage />} />
          <Route path='stream' element={<StreamPage />} />
        </Route>
        <Route path='*' element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
