export default function Note({ remove, edit, note }: INotePorps) {

  return (
    <div id={note.id} onClick={() => edit(note.id)} className="main__note">
      <div className="main__note-title">
        {note.title}
      </div>
      <div className="main__note-btns">
        <button className="main__note-edit">
          Редактировать
        </button>
        <button onClick={(e) => { e.stopPropagation(); remove(note.id)}} className="main__note-remove">
          Удалить
        </button>
      </div>
    </div>
  );
}
