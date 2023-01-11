import { useEffect, useState } from 'react';
import AppRouter from './componets/AppRouter';
import { AuthContext, LoadingContext } from './context';


function App() {
  const [lazyLoading, setLazyLoading] = useState<boolean>(false);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setIsAuth(true);
    }
    setIsLoading(false);
  }, []);

  return (
    <div className="wrapper">
      <LoadingContext.Provider
        value={{
          lazyLoading,
          setLazyLoading,
        }}
      >
        <AuthContext.Provider
          value={{
            isAuth,
            setIsAuth,
            isLoading,
          }}
        >
          <AppRouter />
        </AuthContext.Provider>
      </LoadingContext.Provider>
    </div>
  );
}

export default App;
