import Note from './Note';


function NoteList({ notes, remove, edit }: INoteListProps) {

  return (
    <main className="main">
      <div className="main__notes">
        {notes.map((note) => (
          <Note
            remove={remove}
            edit={edit}
            key={note.id}
            note={note}
          />
        ))}
      </div>
    </main>
  );
}

export { NoteList };
