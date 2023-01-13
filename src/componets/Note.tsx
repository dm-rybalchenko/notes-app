import dayjs from 'dayjs';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NoteService from '../API/NoteService';
import useFetching from '../hooks/useFetching';

import { removeNote } from '../store/notesReducer';


export default function Note({ note }: INotePorps) {
  const dispatch = useDispatch();
  const router = useNavigate();
  
  const [remove, isLoading, err] = useFetching(async (note: INote) => {
    note._id && (await NoteService.delete(note._id));
    !err && dispatch(removeNote(note._id));
  });

  const editDate = useCallback(
    (note: INote) =>
      note.date ? dayjs(note.date).format('DD.MM.YY HH:mm') : 'unknown',
    [note.date]
  );

  return (
    <div
      id={note._id}
      onClick={() => router(`/edit/${note._id}`)}
      className="main__note"
    >
      <div className="main__note-title">{note.title}</div>
      <div className="main__note-body">
        <div className="main__note-content">{note.body}</div>
        <div className="main__note-date">
          Изменено:
          <br />
          {editDate(note)}
        </div>
      </div>
      <div className="main__note-btns">
        <button className="main__note-edit">Редактировать</button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            remove(note);
          }}
          className="main__note-remove"
        >
          {isLoading ? 'Удаляется...' : 'Удалить'}
        </button>
        {err && <h1>{err}</h1>}
      </div>
    </div>
  );
}
