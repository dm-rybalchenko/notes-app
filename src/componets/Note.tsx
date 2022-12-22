import dayjs from 'dayjs';
import { useCallback } from 'react';


export default function Note({ remove, edit, note }: INotePorps) {
	
  const editDate = useCallback(
    (note: INote) =>
      note.date ? dayjs(note.date).format('DD.MM.YY HH:mm') : 'unknown',
    [note.date]
  );

  return (
    <div id={note.id} onClick={() => edit(note.id)} className="main__note">
      <div className="main__note-title">{note.title}</div>
      <div className="main__note-btns">
        <div className="main__note-date">
          Изменено:
          <br />
          {editDate(note)}
        </div>
        <button className="main__note-edit">Редактировать</button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            remove(note.id);
          }}
          className="main__note-remove"
        >
          Удалить
        </button>
      </div>
    </div>
  );
}
