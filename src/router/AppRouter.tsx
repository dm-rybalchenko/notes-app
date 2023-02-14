import {
  BrowserRouter, Route, Navigate, Routes,
} from 'react-router-dom';

import { useTypedSelector } from '../hooks/useTypedSelector';
import { publicRoutes, privateRoutes } from './index';


function AppRouter(): JSX.Element {
  const auth = useTypedSelector((state) => state.auth);

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
          <Route path="/login" element={<Navigate to="/notes" />} />
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
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/notes" element={<Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/error" />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default AppRouter;
