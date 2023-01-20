import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import TagList from './TagList';
import Button from './UI/Button';
import SearchForm from './SearchForm';
import useTags from '../hooks/useTags';
import {
  removeTagFromSort,
  setDefaultFilter,
  sortByTag,
} from '../store/filterReducer';
import { removeTag, setDefaultNotes } from '../store/notesReducer';
import useFetching from '../hooks/useFetching';
import UserService from '../API/UserService';
import { setDefaultPages } from '../store/paginationReducer';
import { setDefaultAuth } from '../store/authReducer';
import Loader from './UI/Loader';


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
    <header className="header">
      {isLoadingLogout && <Loader />}
      {errLogout && <h1>{errLogout}</h1>}
      <button onClick={logout} className="tags__item">
        Выйти
      </button>
      <p>{auth.user.email}</p>
      <p>
        {auth.user.isActivated
          ? 'Аккаунт подтвержден по почте'
          : 'ПОДТВЕРДИТЕ АККАУНТ!'}
      </p>
      <div className="header__upper">
        <div className="header__title">Заметки</div>
        <div className="header__add">
          <Link to="/edit">
            <Button modClass="header__btn">Добавить заметку</Button>
          </Link>
        </div>
      </div>
      <div className="header__lower">
        <SearchForm />
        <TagList
          choose={includeTag}
          remove={deleteTag}
          tags={tags}
          current={filter.tags}
          modClass="header__tags"
        />
      </div>
    </header>
  );
}

export default Header;
