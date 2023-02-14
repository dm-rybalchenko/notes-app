import { useCallback, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import NoteService from '../../API/NoteService';
import { ModalContext } from '../../context';
import useFetching from '../../hooks/useFetching';
import { removeNote, updateNote } from '../../store/reducers/notesReducer';
import { showError } from '../../store/reducers/notificationReducer';
import { prepareDate } from '../../utils/utils';
import IconFavorites from '../UI/icons/IconFavorites';
import IconPin from '../UI/icons/IconPin';
import IconTrashBin from '../UI/icons/IconTrashBin';
import IconUnpin from '../UI/icons/IconUnpin';

import { IModalContext } from '../../interfaces/context.types';
import { INote, INotePorps } from './note.types';

import stl from './note.module.scss';


function Note({ note }: INotePorps): JSX.Element {
  const { setModal } = useContext<IModalContext>(ModalContext);
  const dispatch = useDispatch();
  const router = useNavigate();

  const [remove, isLoadingRemove, errRemove] = useFetching<INote>(
    async (note: INote) => {
      if (note.id) {
        dispatch(removeNote(note.id));
        await NoteService.delete(note.id);
      }
    },
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [saveNote, isLoadingSave, errSave] = useFetching<INote>(
    async (note: INote) => {
      dispatch(updateNote(note));
      await NoteService.update(note);
    },
  );

  const editDate = useCallback(
    (date: string) => prepareDate(date),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [note.date],
  );

  const rootClasses = [stl.favorites];

  if (note.favorite) {
    rootClasses.push(stl['in-favorites']);
  }

  const toggleFavorites = (note: INote): void => {
    saveNote({ ...note, favorite: !note.favorite });
  };

  const togglePinned = (note: INote): void => {
    saveNote({ ...note, pinned: !note.pinned });
  };

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>): void => {
    setModal({
      coords: { x: e.pageX, y: e.pageY },
      body: `«${note.title}»`,
      title: 'Удалить заметку?',
      callback: () => remove(note),
    });
  };

  useEffect(() => {
    errRemove && dispatch(showError(`Ошибка удаления заметки: ${errRemove}`));
    errSave
      && dispatch(showError(`Ошибка сохранения изменений заметки: ${errSave}`));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errRemove, errSave]);

  return (
    <div
      id={note.id}
      onClick={(): void => router(`/edit/${note.id}`)}
      className={stl.note}
    >
      <div className={stl.title}>{note.title}</div>
      <div className={stl.body}>
        <div className={stl.content}>{note.body}</div>
      </div>
      <div className={stl.date}>
        Изменено
        {editDate(note.date)}
      </div>
      <div onClick={(e): void => e.stopPropagation()} className={stl.btns}>
        <button
          onClick={(): void => toggleFavorites(note)}
          className={rootClasses.join(' ')}
        >
          <IconFavorites />
          {' '}
          {note.favorite ? 'В избранном' : 'В избранное'}
        </button>
        <button onClick={(): void => togglePinned(note)} className={stl.pin}>
          {note.pinned ? (
            <>
              <IconUnpin />
              {' '}
              Открепить
            </>
          ) : (
            <>
              <IconPin />
              {' '}
              Закрепить
            </>
          )}
        </button>
        <button onClick={handleRemove} className={stl.remove}>
          <IconTrashBin />
          {' '}
          {isLoadingRemove ? 'Удаляется...' : 'Удалить'}
        </button>
      </div>
    </div>
  );
}

export default Note;
