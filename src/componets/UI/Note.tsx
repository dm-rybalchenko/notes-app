export default function Note({ remove, show, edit, title, id }: INotePorps) {

  return (
    <div id={id} className="main__note">
      <div onClick={() => show(id)} className="main__note-title">
        {title}
      </div>
      <div className="main__note-btns">
        <button onClick={() => edit(id)} className="main__note-edit">
          Редактировать
        </button>
        <button onClick={() => remove(id)} className="main__note-remove">
          Удалить
        </button>
      </div>
    </div>
  );
}
