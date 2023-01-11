import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { LoadingContext } from '../context';
import { searchNotes, sortNotes } from '../store/filterReducer';
import { setLimit } from '../store/paginationReducer';
import Select from './UI/Select';

export default function SearchForm() {
  const { lazyLoading, setLazyLoading } = useContext(LoadingContext);
  const filter = useSelector((state: IMainState) => state.filter);
  const { limit, page } = useSelector((state: IMainState) => state.pagination);
  const dispatch = useDispatch();

  return (
    <div className="header__filter">
      <input
        value={filter.query}
        onChange={(e) => dispatch(searchNotes(e.target.value))}
        type="text"
        placeholder="Поиск..."
        className="header__tag-input"
      />
      <Select
        value={filter.sort}
        onChange={(value) => dispatch(sortNotes(value))}
        defaultValue="Сортировка"
        options={[
          { value: 'title', name: 'По заголовку' },
          { value: 'old', name: 'Старые' },
          { value: 'new', name: 'Новые' },
        ]}
      />
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
      <div>
        <input
          checked={lazyLoading}
          onChange={() => setLazyLoading(!lazyLoading)}
          type="checkbox"
        />
        Lazy
      </div>
    </div>
  );
}
