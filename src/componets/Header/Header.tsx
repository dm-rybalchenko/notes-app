import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { IHeaderPorps } from './header.types';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import {
  searchNotes,
  setDefaultFilter,
} from '../../store/reducers/filterReducer';
import {
  showError,
  showWarning,
} from '../../store/reducers/notificationReducer';
import { setDefaultNotes } from '../../store/reducers/notesReducer';
import useFetching from '../../hooks/useFetching';
import UserService from '../../API/UserService';
import { setDefaultPages } from '../../store/reducers/paginationReducer';
import { setDefaultAuth } from '../../store/reducers/authReducer';
import ButtonBig from '../UI/buttons/button-big/ButtonBig';
import Input from '../UI/input/Input';
import IconLogout from '../UI/icons/IconLogout';
import Loader from '../UI/loader/Loader';
import IconLogo from '../UI/icons/IconLogo';

import stl from './header.module.scss';


function Header({ children, main }: IHeaderPorps): JSX.Element {
  const filter = useTypedSelector((state) => state.filter);
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

  useEffect(() => {
    if (auth.isAuth && !auth.user.isActivated) {
      dispatch(showWarning(`Подтвердите ваш email: ${auth.user.email}`));
    }
  }, []);

  useEffect(() => {
    errLogout && dispatch(showError(`Ошибка выхода из аккаунта: ${errLogout}`));
  }, [errLogout]);

  return (
    <header className={stl.header}>
      <Link to="/" className={stl.logo}>
        <IconLogo />
      </Link>
      {main ? (
        <>
          <button className={stl.logout}>
            {auth.user.email}
            <IconLogout onClick={logout} />
          </button>
          {isLoadingLogout && <Loader />}
          <div className={stl.search}>
            <Input
              onChange={(e) => dispatch(searchNotes(e.target.value))}
              value={filter.query}
              type="search"
              placeholder="Поиск по заметкам..."
            />
          </div>
          <div className={stl.add}>
            <Link to="/edit">
              <ButtonBig modClass={stl.btn}>Добавить заметку</ButtonBig>
            </Link>
          </div>
        </>
      ) : (
        <div className={stl.login}>{children}</div>
      )}
    </header>
  );
}

export default Header;
