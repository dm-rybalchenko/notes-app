import { useState } from 'react';
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';

import { routes } from './router';
import { LoadingContext } from './context';


function App() {
  const [lazyLoading, setLazyLoading] = useState<boolean>(false);
  
  return (
    <div className="wrapper">
      <LoadingContext.Provider
        value={{
          lazyLoading,
          setLazyLoading,
        }}
      >
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
      </LoadingContext.Provider>
    </div>
  );
}

export default App;
