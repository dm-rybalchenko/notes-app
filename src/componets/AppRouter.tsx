import { useContext } from 'react';
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';

import { AuthContext } from '../context';
import { publicRoutes, privateRoutes } from '../router';
import Loader from './UI/Loader';

function AppRouter() {
  const { isAuth, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      {isAuth ? (
        <Routes>
          {privateRoutes.map((route) => (
            <Route
              path={route.path}
              element={route.component}
              key={route.path}
            />
          ))}
          <Route path="/" element={<Navigate to="/notes" />} />
          <Route path="login" element={<Navigate to="/notes" />} />
          <Route path="*" element={<Navigate to="/error" />} />
        </Routes>
      ) : (
        <Routes>
          {publicRoutes.map((route) => (
            <Route
              path={route.path}
              element={route.component}
              key={route.path}
            />
          ))}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default AppRouter;
