import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

import { API_URL } from '../API/api';
import { useTypedSelector } from '../hooks/useTypedSelector';
import AppRouter from '../router/AppRouter';
import Loader from '../componets/UI/loader/Loader';
import { LoadingContext, ModalContext } from '../context';
import useFetching from '../hooks/useFetching';
import { setIsAuth, setUser } from '../store/reducers/authReducer';
import Warning from '../componets/UI/notifications/Warning';
import Error from '../componets/UI/notifications/Error';

import { IModal } from '../interfaces/context.types';
import { IAuthModel } from '../interfaces/apiModels.types';

import stl from './app.module.scss';


function App(): JSX.Element {
  const [lazyLoading, setLazyLoading] = useState<boolean>(true);
  const [modal, setModal] = useState<null | IModal>(null);
  const { error, warning } = useTypedSelector((state) => state.notification);
  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [checkAuth, isLoadingCheck, errCheck] = useFetching(async () => {
    const response = await axios.get<IAuthModel>(`${API_URL}/user/refresh`, {
      withCredentials: true,
    });

    localStorage.setItem('token', response.data.accessToken);
    dispatch(setUser(response.data.user));
    dispatch(setIsAuth(true));
  });

  const LoadingContextValue = useMemo(
    () => ({ lazyLoading, setLazyLoading }),
    [lazyLoading, setLazyLoading],
  );

  const ModalContextValue = useMemo(
    () => ({ modal, setModal }),
    [modal, setModal],
  );

  useEffect(() => {
    if (localStorage.getItem('token')) {
      checkAuth();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoadingCheck) {
    return <Loader />;
  }

  return (
    <>
      <div className={stl.wrapper}>
        <LoadingContext.Provider value={LoadingContextValue}>
          <ModalContext.Provider value={ModalContextValue}>
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
        />
      )}
    </>
  );
}

export default App;
