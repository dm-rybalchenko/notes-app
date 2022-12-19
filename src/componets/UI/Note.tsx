export default function Note({ remove, edit, title, id }: INotePorps) {

  return (
    <div id={id} onClick={() => edit(id)} className="main__note">
      <div className="main__note-title">
        {title}
      </div>
      <div className="main__note-btns">
        <button className="main__note-edit">
          Редактировать
        </button>
        <button onClick={(e) => { e.stopPropagation(); remove(id)}} className="main__note-remove">
          Удалить
        </button>
      </div>
    </div>
  );
}
