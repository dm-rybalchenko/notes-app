import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';
import { routes } from './router';

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          {routes.map((route) => (
            <Route
              path={route.path}
              element={route.component}
              key={route.path}
            />
          ))}
          <Route path="/" element={<Navigate to="/notes" />} />
          <Route path="*" element={<Navigate to="/error" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
