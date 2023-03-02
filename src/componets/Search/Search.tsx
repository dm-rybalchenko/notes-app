import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { useTypedSelector } from '../../hooks/useTypedSelector';
import { searchNotes } from '../../store/reducers/filterReducer';
import IconSearch from '../UI/icons/IconSearch';
import Input from '../UI/input/Input';

import stl from './search.module.scss';


function Search(): JSX.Element {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const filter = useTypedSelector((state) => state.filter);
  const dispatch = useDispatch();

  const toggleSearch = (): void => {
    if (showSearch) {
      setShowSearch(false);
      dispatch(searchNotes(''));
    } else {
      setShowSearch(true);
    }
  };

  return (
    <>
      <div
        onClick={(e): void => e.stopPropagation()}
        className={showSearch ? `${stl.search} ${stl.active}` : stl.search}
      >
        <Input
          onChange={(e): void => {
            dispatch(searchNotes(e.target.value));
          }}
          value={filter.query}
          type="search"
          placeholder="Поиск по заметкам..."
        />
        <button onClick={toggleSearch} className={stl['search-close']}>
          Отменить
        </button>
      </div>
      <button onClick={toggleSearch} className={stl['search-btn']}>
        <IconSearch />
      </button>
    </>
  );
}

export default Search;
