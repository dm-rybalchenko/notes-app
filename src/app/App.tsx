import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { API_URL } from '../API/api';
import AppRouter from '../router/AppRouter';
import Loader from '../componets/UI/loader/Loader';
import { LoadingContext, ModalContext } from '../context';
import useFetching from '../hooks/useFetching';
import { setIsAuth, setUser } from '../store/reducers/authReducer';
import Warning from '../componets/UI/notifications/Warning';
import Error from '../componets/UI/notifications/Error';

import stl from './app.module.scss';


function App() {
  const [lazyLoading, setLazyLoading] = useState<boolean>(true);
  const [modal, setModal] = useState<null | IModal>(null);
  const { error, warning } = useSelector(
    (state: IMainState) => state.notification
  );
  const dispatch = useDispatch();

  const [checkAuth, isLoadingCheck, errCheck] = useFetching(async () => {
    const response = await axios.get<AuthResponce>(`${API_URL}/user/refresh`, {
      withCredentials: true,
    });

    localStorage.setItem('token', response.data.accessToken);
    dispatch(setUser(response.data.user));
    dispatch(setIsAuth(true));
  });

  useEffect(() => {
    if (localStorage.getItem('token')) {
      checkAuth();
    }
  }, []);

  if (isLoadingCheck) {
    return <Loader />;
  }

  return (
    <>
      <div className={stl.wrapper}>
        <LoadingContext.Provider
          value={{
            lazyLoading,
            setLazyLoading,
          }}
        >
          <ModalContext.Provider
            value={{
              modal,
              setModal,
            }}
          >
            {error && <Error />}
            {warning && <Warning />}
            <AppRouter />
          </ModalContext.Provider>
        </LoadingContext.Provider>
      </div>
      {modal && (
        <div
          className={stl.scrollbar}
          style={{
            width: window.innerWidth - document.documentElement.clientWidth,
          }}
        ></div>
      )}
    </>
  );
}

export default App;
