import { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import NoteService from '../../API/NoteService';
import { useTypedSelector } from '../../hooks/useTypedSelector';
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
import Switcher from '../UI/switcher/Switcher';

import { ILoadingContext } from '../../interfaces/context.types';
import { IFiltersProps, INote } from './filters.types';

import stl from './filters.module.scss';


function Filters({ favorites, setFavorites }: IFiltersProps): JSX.Element {
  const { lazyLoading, setLazyLoading } =
    useContext<ILoadingContext>(LoadingContext);

  const { notes } = useTypedSelector((state) => state.notes);
  const filter = useTypedSelector((state) => state.filter);
  const dispatch = useDispatch();
  const tags = useTags(notes);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [removeTags, isLoading, error] = useFetching<INote[]>(async (notes) => {
    notes.forEach(async (note) => {
      await NoteService.update(note);
    });
  });

  const rootClasses = [stl.favorites];
  if (favorites) {
    rootClasses.push(stl.active);
  }

  const deleteTag = (tag: string): void => {
    const editedNotes = notes
      .filter((note) => note.tags.includes(tag))
      .map((note) => ({
        ...note,
        body: note.body.replaceAll(tag, tag.slice(1)),
        tags: note.tags.filter((noteTag: string) => noteTag !== tag),
      }));

    editedNotes.forEach((note) => dispatch(updateNote(note)));
    dispatch(removeTagFromSort(tag));
    removeTags(editedNotes);
  };

  useEffect(() => {
    error && dispatch(showError(`Ошибка обновления заметок: ${error}`));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <div>
      <div className={stl.filters}>
        <button
          onClick={(): void => setFavorites(!favorites)}
          className={rootClasses.join(' ')}
        >
          <IconFavorites />
          Избранное
        </button>
        <Select
          value={{ value: 'new', name: 'По дате изменения' }}
          onChange={(value): void => {
            value && dispatch(sortNotes(value?.value));
          }}
          options={[
            { value: 'new', name: 'По дате изменения' },
            { value: 'title', name: 'По заголовку' },
            { value: 'old', name: 'Сначала старые' },
          ]}
        />
        <Select
          value={{ value: '10', name: 'По 10' }}
          onChange={(value): void => {
            value && dispatch(setLimit(parseInt(value?.value)));
          }}
          options={[
            { value: '-1', name: 'Выводить все' },
            { value: '5', name: 'По 5' },
            { value: '10', name: 'По 10' },
            { value: '15', name: 'По 15' },
          ]}
        />
        <div className={stl.lazy}>
          <Switcher
            checked={!lazyLoading}
            onChange={(): void => setLazyLoading(!lazyLoading)}
          />
          Страницы
        </div>
      </div>
      <div className={stl.tags}>
        <TagList
          choose={(tag: string): void => {
            dispatch(sortByTag(tag));
          }}
          remove={deleteTag}
          tags={tags}
          current={filter.tags}
        />
      </div>
    </div>
  );
}

export default Filters;
