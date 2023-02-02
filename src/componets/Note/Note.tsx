import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import NoteService from '../../API/NoteService';
import useFetching from '../../hooks/useFetching';
import { removeNote, updateNote } from '../../store/reducers/notesReducer';
import { prepareDate } from '../../utils/utils';
import Modal from '../Modal/Modal';
import IconFavorites from '../UI/icons/IconFavorites';
import IconPin from '../UI/icons/IconPin';
import IconTrashBin from '../UI/icons/IconTrashBin';
import IconUnpin from '../UI/icons/IconUnpin';

import stl from './note.module.scss';

function Note({ note }: INotePorps) {
  const dispatch = useDispatch();
  const router = useNavigate();
  const [showPopup, setShowPopup] = useState<any>(null);

  const [remove, isLoading, err] = useFetching<INote>(async (note: INote) => {
    note.id && (await NoteService.delete(note.id));
    !err && dispatch(removeNote(note.id));
  });

  const editDate = useCallback(
    (date: string) => prepareDate(date),
    [note.date]
  );

  const rootClasses = [stl.favorites];

  if (note.favorite) {
    rootClasses.push(stl.in_favorites);
  }

  const toggleFavorites = (note: INote) => {
    dispatch(updateNote({ ...note, favorite: !note.favorite }));
  };

  const togglePinned = (note: INote) => {
    dispatch(updateNote({ ...note, pinned: !note.pinned }));
  };

  const handleRemove = (e: any) => {
    setShowPopup({x: e.pageX, y: e.pageY});
  };



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
          <IconTrashBin /> {isLoading ? 'Удаляется...' : 'Удалить'}
        </button>
        {err && <h1>{err}</h1>}
      </div>
      <div>
        {showPopup && <Modal coords={showPopup} />}
      </div>
    </div>
  );
}

export default Note;
