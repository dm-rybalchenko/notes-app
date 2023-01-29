import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import TagList from '../TagList/TagList';
import Button from '../UI/buttons/button-big/ButtonBig';
import SearchForm from '../SearchForm/SearchForm';
import useTags from '../../hooks/useTags';
import {
  removeTagFromSort,
  setDefaultFilter,
  sortByTag,
} from '../../store/filterReducer';
import { removeTag, setDefaultNotes } from '../../store/notesReducer';
import useFetching from '../../hooks/useFetching';
import UserService from '../../API/UserService';
import { setDefaultPages } from '../../store/paginationReducer';
import { setDefaultAuth } from '../../store/authReducer';
import Loader from '../UI/Loader';

import stl from './header.module.scss';
import btnStl from '../UI/buttons/button-small/buttonSmall.module.scss'


function Header() {
  const { notes } = useSelector((state: IMainState) => state.notes);
  const filter = useSelector((state: IMainState) => state.filter);
  const auth = useSelector((state: IMainState) => state.auth);
  const dispatch = useDispatch();
  const [tags, setTags] = useTags(notes);

  const [logout, isLoadingLogout, errLogout] = useFetching(async () => {
    const response = await UserService.logout();

    localStorage.removeItem('token');
    dispatch(setDefaultAuth());
    dispatch(setDefaultPages());
    dispatch(setDefaultFilter());
    dispatch(setDefaultNotes());
  });

  const deleteTag = (tag: string) => {
    dispatch(removeTag(tag));
    dispatch(removeTagFromSort(tag));
  };

  const includeTag = (tag: string) => {
    dispatch(sortByTag(tag));
  };

  return (
    <header className={stl.header}>
      {isLoadingLogout && <Loader />}
      {errLogout && <h1>{errLogout}</h1>}
      <button onClick={logout} className={btnStl.button}>
        Выйти
      </button>
      <p>{auth.user.email}</p>
      <p>
        {auth.user.isActivated
          ? 'Аккаунт подтвержден по почте'
          : 'ПОДТВЕРДИТЕ АККАУНТ!'}
      </p>
      <div className={stl.upper}>
        <div className={stl.title}>Заметки</div>
        <div className={stl.add}>
          <Link to="/edit">
            <Button modClass={stl.btn}>Добавить заметку</Button>
          </Link>
        </div>
      </div>
      <div className={stl.lower}>
        <SearchForm />
        <TagList
          choose={includeTag}
          remove={deleteTag}
          tags={tags}
          current={filter.tags}
        />
      </div>
    </header>
  );
}

export default Header;
