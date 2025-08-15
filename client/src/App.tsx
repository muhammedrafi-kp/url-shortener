import React from 'react';
import { Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SavedUrlsPage from './pages/SavedUrlsPage';
import ProtectedRoute from './routes/ProtectedRoute';
import PublicRoute from './routes/PublicRoute';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<LoginPage />} />
        </Route>

        <Route element={<ProtectedRoute />} >
          <Route path='/' element={<HomePage />} />
          <Route path='/saved-urls' element={<SavedUrlsPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
