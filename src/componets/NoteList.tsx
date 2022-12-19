import Note from './UI/Note';


function NoteList({ notes, remove, edit }: INoteListProps) {

  return (
    <main className="main">
      <div className="main__notes">
        {notes.map((note) => (
          <Note
            remove={remove}
            edit={edit}
            id={note.id}
            key={note.id}
            title={note.title}
          />
        ))}
      </div>
    </main>
  );
}

export { NoteList };
