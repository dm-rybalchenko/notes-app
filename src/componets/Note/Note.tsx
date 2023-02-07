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

import stl from './note.module.scss';

function Note({ note }: INotePorps) {
  const { setModal } = useContext(ModalContext);
  const dispatch = useDispatch();
  const router = useNavigate();

  const [remove, isLoadingRemove, errRemove] = useFetching<INote>(
    async (note: INote) => {
      if (note.id) {
        dispatch(removeNote(note.id));
        await NoteService.delete(note.id);
      }
    }
  );

  const [saveNote, isLoadingSave, errSave] = useFetching<INote>(
    async (note: INote) => {
      dispatch(updateNote(note));
      await NoteService.update(note);
    }
  );

  const editDate = useCallback(
    (date: string) => prepareDate(date),
    [note.date]
  );

  const rootClasses = [stl.favorites];

  if (note.favorite) {
    rootClasses.push(stl.in_favorites);
  }

  const toggleFavorites = (note: INote) => {
    saveNote({ ...note, favorite: !note.favorite });
  };

  const togglePinned = (note: INote) => {
    saveNote({ ...note, pinned: !note.pinned });
  };

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    setModal({
      coords: { x: e.pageX, y: e.pageY },
      body: `«${note.title}»`,
      title: 'Удалить заметку?',
      callback: () => remove(note),
    });
  };

  useEffect(() => {
    errRemove && dispatch(showError(`Ошибка удаления заметки: ${errRemove}`));
    errSave &&
      dispatch(showError(`Ошибка сохранения изменений заметки: ${errSave}`));
  }, [errRemove, errSave]);

  return (
    <div
      id={note.id}
      onClick={() => router(`/edit/${note.id}`)}
      className={stl.note}
    >
      <div className={stl.title}>{note.title}</div>
      <div className={stl.body}>
        <div className={stl.content}>{note.body}</div>
      </div>
      <div className={stl.date}>Изменено {editDate(note.date)}</div>
      <div onClick={(e) => e.stopPropagation()} className={stl.btns}>
        <button
          onClick={() => toggleFavorites(note)}
          className={rootClasses.join(' ')}
        >
          <IconFavorites /> {note.favorite ? 'В избранном' : 'В избранное'}
        </button>
        <button onClick={() => togglePinned(note)} className={stl.pin}>
          {note.pinned ? (
            <>
              <IconUnpin /> Открепить
            </>
          ) : (
            <>
              <IconPin /> Закрепить
            </>
          )}
        </button>
        <button onClick={handleRemove} className={stl.remove}>
          <IconTrashBin /> {isLoadingRemove ? 'Удаляется...' : 'Удалить'}
        </button>
      </div>
      {/* {isLoadingSave && 'Сохраняется...'} */}
      {errRemove && <h1>{errRemove}</h1>}
      {errSave && <h1>{errSave}</h1>}
    </div>
  );
}

export default Note;
