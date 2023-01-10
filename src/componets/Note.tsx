import dayjs from 'dayjs';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { removeNote } from '../store/notesReducer';


export default function Note({ note }: INotePorps) {
	const dispatch = useDispatch();
	const router = useNavigate();
	
  const editDate = useCallback(
    (note: INote) =>
      note.date ? dayjs(note.date).format('DD.MM.YY HH:mm') : 'unknown',
    [note.date]
  );

  return (
    <div id={note.id} onClick={() => router(`/notes/${note.id}`)} className="main__note">
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
            dispatch(removeNote(note.id))
          }}
          className="main__note-remove"
        >
          Удалить
        </button>
      </div>
    </div>
  );
}
