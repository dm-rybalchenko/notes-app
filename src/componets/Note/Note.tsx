import dayjs from 'dayjs';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import NoteService from '../../API/NoteService';
import useFetching from '../../hooks/useFetching';
import { removeNote } from '../../store/notesReducer';

import stl from './note.module.scss';


function Note({ note }: INotePorps) {
  const dispatch = useDispatch();
  const router = useNavigate();

  const [remove, isLoading, err] = useFetching<INote>(async (note: INote) => {
    note.id && (await NoteService.delete(note.id));
    !err && dispatch(removeNote(note.id));
  });

  const editDate = useCallback(
    (note: INote) =>
      note.date ? dayjs(note.date).format('DD.MM.YY HH:mm') : 'unknown',
    [note.date]
  );

  return (
    <div
      id={note.id}
      onClick={() => router(`/edit/${note.id}`)}
      className={stl.note}
    >
      <div className={stl.note_tilte}>{note.title}</div>
      <div className={stl.body}>
        <div className={stl.content}>{note.body}</div>
        <div className={stl.date}>
          Изменено:
          <br />
          {editDate(note)}
        </div>
      </div>
      <div className={stl.btns}>
        <button className={stl.edit}>Редактировать</button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            remove(note);
          }}
          className={stl.remove}
        >
          {isLoading ? 'Удаляется...' : 'Удалить'}
        </button>
        {err && <h1>{err}</h1>}
      </div>
    </div>
  );
}

export default Note;
