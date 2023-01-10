import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import TagList from './TagList';
import Button from './UI/Button';
import SearchForm from './SearchForm';
import useTags from '../hooks/useTags';
import Select from './UI/Select';
import { removeTagFromSort, sortByTag } from '../store/filterReducer';
import { setLimit } from '../store/paginationReducer';
import { removeTag } from '../store/notesReducer';


function Header() {
  const { notes } = useSelector((state: IMainState) => state.notes);
  const filter = useSelector((state: IMainState) => state.filter);
  const { limit, page } = useSelector((state: IMainState) => state.pagination);
  const dispatch = useDispatch();

   const [tags, setTags] = useTags(notes);

  const deleteTag = (tag: string) => {
    dispatch(removeTag(tag));
    dispatch(removeTagFromSort(tag));
  };

  const includeTag = (tag: string) => {
    dispatch(sortByTag(tag));
  };

  return (
    <header className="header">
      <div className="header__upper">
        <div className="header__title">Заметки</div>
        <div className="header__add">
          <Link to="/notes/new">
            <Button modClass="header__btn">Добавить заметку</Button>
          </Link>
        </div>
      </div>
      <div className="header__lower">
        <TagList
          choose={includeTag}
          remove={deleteTag}
          tags={tags}
          current={filter.tags}
          modClass="header__tags"
        />
        <SearchForm />
        <Select
          value={limit}
          onChange={(value) => dispatch(setLimit(parseInt(value)))}
          defaultValue="Заметок на странице"
          options={[
            { value: -1, name: 'Выводить все' },
            { value: 5, name: 'По 5' },
            { value: 10, name: 'По 10' },
            { value: 15, name: 'По 15' },
          ]}
        />
      </div>
    </header>
  );
}

export default Header;
