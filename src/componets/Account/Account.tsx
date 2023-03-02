import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import UserService from '../../API/UserService';
import useFetching from '../../hooks/useFetching';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { setDefaultAuth } from '../../store/reducers/authReducer';
import { setDefaultFilter } from '../../store/reducers/filterReducer';
import { setDefaultNotes } from '../../store/reducers/notesReducer';
import {
  showWarning,
  showError,
} from '../../store/reducers/notificationReducer';
import { setDefaultPages } from '../../store/reducers/paginationReducer';
import IconLogin from '../UI/icons/IconLogin';
import IconLogout from '../UI/icons/IconLogout';

import stl from './account.module.scss';


function Account(): JSX.Element {
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const auth = useTypedSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [logout, isLoadingLogout, errLogout] = useFetching(async () => {
    await UserService.logout();

    localStorage.removeItem('token');
    dispatch(setDefaultAuth());
    dispatch(setDefaultPages());
    dispatch(setDefaultFilter());
    dispatch(setDefaultNotes());
  });

  const toggleLogin = (): void => {
    setShowLogin(!showLogin);
  };

  useEffect(() => {
    if (auth.isAuth && !auth.user.isActivated) {
      dispatch(showWarning(`Подтвердите ваш email: ${auth.user.email}`));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    errLogout && dispatch(showError(`Ошибка выхода из аккаунта: ${errLogout}`));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errLogout]);

  return (
    <>
      <div className={showLogin ? `${stl.account} ${stl.active}` : stl.account}>
        <div className={stl.menu}>
          <p className={stl.email}>
            {isLoadingLogout ? 'Выход...' : auth.user.email}
          </p>
          <button
            onClick={logout}
            className={`${stl['account-close']} ${stl.logout}`}
          >
            Выйти из аккаунта
          </button>
          <button onClick={logout} className={stl['icon-logout']}>
            <IconLogout />
          </button>
          <button onClick={toggleLogin} className={stl['account-close']}>
            Закрыть окно
          </button>
        </div>
      </div>
      <button onClick={toggleLogin} className={stl['account-btn']}>
        <IconLogin />
      </button>
    </>
  );
}

export default Account;
