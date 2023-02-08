import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NoteService from '../../API/NoteService';

import { LoadingContext } from '../../context';
import useFetching from '../../hooks/useFetching';
import useTags from '../../hooks/useTags';
import {
  removeTagFromSort,
  sortByTag,
  sortNotes,
} from '../../store/reducers/filterReducer';
import { updateNote } from '../../store/reducers/notesReducer';
import { showError } from '../../store/reducers/notificationReducer';
import { setLimit } from '../../store/reducers/paginationReducer';
import TagList from '../TagList/TagList';
import IconFavorites from '../UI/icons/IconFavorites';
import Select from '../UI/select/Select';

import stl from './filters.module.scss';


function Filters({ favorites, setFavorites }: IFiltersProps) {
  const { lazyLoading, setLazyLoading } = useContext(LoadingContext);
  const { notes } = useSelector((state: IMainState) => state.notes);
  const filter = useSelector((state: IMainState) => state.filter);
  const { limit } = useSelector((state: IMainState) => state.pagination);
  const dispatch = useDispatch();
  const tags = useTags(notes);

  const [removeTags, isLoading, error] = useFetching<INote[]>(async (notes) => {
    notes.forEach(async (note) => {
      await NoteService.update(note);
    });
  });

  const rootClasses = [stl.favorites];
  if (favorites) {
    rootClasses.push(stl.active);
  }

  const deleteTag = (tag: string) => {
    let editedNotes = notes
      .filter((note) => note.tags.includes(tag))
      .map((note) => ({
        ...note,
        body: note.body.replaceAll(tag, tag.slice(1)),
        tags: note.tags.filter((noteTag) => noteTag !== tag),
      }));

    editedNotes.forEach((note) => dispatch(updateNote(note)));
    dispatch(removeTagFromSort(tag));
    removeTags(editedNotes);
  };

  useEffect(() => {
    error && dispatch(showError(`Ошибка обновления заметок: ${error}`));
  }, [error]);

  return (
    <div>
      <div className={stl.filters}>
        <button
          onClick={() => setFavorites(!favorites)}
          className={rootClasses.join(' ')}
        >
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
          choose={(tag: string) => dispatch(sortByTag(tag))}
          remove={deleteTag}
          tags={tags}
          current={filter.tags}
        />
      </div>
    </div>
  );
}

export default Filters;
