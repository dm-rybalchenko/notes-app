import { useDispatch, useSelector } from 'react-redux';
import { searchNotes, sortNotes } from '../store/filterReducer';
import Select from './UI/Select';


export default function SearchForm() {
  const filter = useSelector((state: IMainState) => state.filter);
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
    </div>
  );
}
