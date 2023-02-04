import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../UI/buttons/button-big/ButtonBig';
import {
  searchNotes,
  setDefaultFilter,
} from '../../store/reducers/filterReducer';
import { setDefaultNotes } from '../../store/reducers/notesReducer';
import useFetching from '../../hooks/useFetching';
import UserService from '../../API/UserService';
import { setDefaultPages } from '../../store/reducers/paginationReducer';
import { setDefaultAuth } from '../../store/reducers/authReducer';
import Input from '../UI/input/Input';
import IconLogout from '../UI/icons/IconLogout';
import Loader from '../UI/Loader';

import stl from './header.module.scss';


function Header({ children, main }: IHeaderPorps) {
  const filter = useSelector((state: IMainState) => state.filter);
  const auth = useSelector((state: IMainState) => state.auth);
  const dispatch = useDispatch();

  const [logout, isLoadingLogout, errLogout] = useFetching(async () => {
    const response = await UserService.logout();

    localStorage.removeItem('token');
    dispatch(setDefaultAuth());
    dispatch(setDefaultPages());
    dispatch(setDefaultFilter());
    dispatch(setDefaultNotes());
  });

  return (
    <header className={stl.header}>
      {/* {isLoadingLogout && <Loader />}
      {errLogout && <h1>{errLogout}</h1>}
      <p>
        {auth.user.isActivated
          ? 'Аккаунт подтвержден по почте'
          : 'ПОДТВЕРДИТЕ АККАУНТ!'}
      </p> */}
      <div className={stl.logo}>
        <img src="./img/Logo.png" alt="logo" />
      </div>
      {main ? (
        <>
          <button onClick={logout} className={stl.logout}>
            {auth.user.email}
            <IconLogout />
          </button>
          <div className={stl.search}>
            <Input
              onChange={(e) => dispatch(searchNotes(e.target.value))}
              value={filter.query}
              type="text"
              placeholder="Поиск по заметкам..."
            />
          </div>
          <div className={stl.add}>
            <Link to="/edit">
              <Button modClass={stl.btn}>Добавить заметку</Button>
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
