import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { LoadingContext } from '../../context';
import useTags from '../../hooks/useTags';
import {
  removeTagFromSort,
  sortByTag,
  sortNotes,
} from '../../store/reducers/filterReducer';
import { removeTag } from '../../store/reducers/notesReducer';
import { setLimit } from '../../store/reducers/paginationReducer';
import TagList from '../TagList/TagList';
import IconFavorites from '../UI/icons/IconFavorites';
import Select from '../UI/select/Select';

import stl from './filters.module.scss';

function Filters({favorites, setFavorites}: IFiltersProps) {
  const { lazyLoading, setLazyLoading } = useContext(LoadingContext);
  const { notes } = useSelector((state: IMainState) => state.notes);
  const filter = useSelector((state: IMainState) => state.filter);
  const { limit, page } = useSelector((state: IMainState) => state.pagination);
  const dispatch = useDispatch();
  const tags = useTags(notes);

  const rootClasses = [stl.favorites]

  if(favorites) {
	rootClasses.push(stl.active)
  }

  const deleteTag = (tag: string) => {
    dispatch(removeTag(tag));
    dispatch(removeTagFromSort(tag));
  };

  const includeTag = (tag: string) => {
    dispatch(sortByTag(tag));
  };

  return (
    <div>
      <div className={stl.filters}>
		<button onClick={() => setFavorites(!favorites)} className={rootClasses.join(' ')}>
			<IconFavorites />
			Избранное
		</button>
        <Select
          value={filter.sort}
          onChange={(value) => dispatch(sortNotes(value))}
          defaultValue="Сортировать"
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
      <div className={stl.tags}>
        <TagList
          choose={includeTag}
          remove={deleteTag}
          tags={tags}
          current={filter.tags}
        />
      </div>
    </div>
  );
}

export default Filters;
