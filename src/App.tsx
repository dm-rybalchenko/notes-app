import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { API_URL } from './API/api';
import AppRouter from './router/AppRouter';
import Loader from './componets/UI/Loader';
import { LoadingContext } from './context';
import useFetching from './hooks/useFetching';
import { setIsAuth, setUser } from './store/authReducer';


function App() {
  const dispatch = useDispatch();
  const [lazyLoading, setLazyLoading] = useState<boolean>(false);

  const [checkAuth, isLoadingCheck, errCheck] = useFetching(async () => {
    const response = await axios.get<AuthResponce>(`${API_URL}/user/refresh`, {
      withCredentials: true,
    });

    localStorage.setItem('token', response.data.accessToken);
    dispatch(setUser(response.data.user));
    dispatch(setIsAuth(true));
  });

  useEffect(() => {
    checkAuth();
  }, []);

  if (isLoadingCheck) {
    return <Loader />;
  }

  return (
    <div className="wrapper">
      <LoadingContext.Provider
        value={{
          lazyLoading,
          setLazyLoading,
        }}
      >
        <AppRouter />
      </LoadingContext.Provider>
    </div>
  );
}

export default App;
