import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import TagList from './TagList';
import Button from './UI/Button';
import SearchForm from './SearchForm';
import useTags from '../hooks/useTags';
import { removeTagFromSort, sortByTag } from '../store/filterReducer';
import { removeTag } from '../store/notesReducer';
import { useContext } from 'react';
import { AuthContext } from '../context';

function Header() {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const { notes } = useSelector((state: IMainState) => state.notes);
  const filter = useSelector((state: IMainState) => state.filter);
  const dispatch = useDispatch();
  const [tags, setTags] = useTags(notes);

  const deleteTag = (tag: string) => {
    dispatch(removeTag(tag));
    dispatch(removeTagFromSort(tag));
  };

  const includeTag = (tag: string) => {
    dispatch(sortByTag(tag));
  };

  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem('auth');
  };

  return (
    <header className="header">
      <button onClick={logout} className="tags__item">
        Выйти
      </button>
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
