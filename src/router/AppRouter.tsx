import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';

import { publicRoutes, privateRoutes } from './index';


function AppRouter() {
  const auth = useSelector((state: IMainState) => state.auth);

  return (
    <BrowserRouter>
      {auth.isAuth ? (
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
