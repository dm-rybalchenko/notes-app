import { useState } from 'react';
import Note from '../Note/Note';
import stl from './noteList.module.scss';


function NoteList({ title, notes, wrap }: INoteListProps) {
  const [wrapped, setWrapped] = useState<boolean>(false);

  return (
    <div className={stl.list}>
      <h2 className={stl.title}>{title}</h2>
      {wrap && (
        <button onClick={() => setWrapped(!wrapped)} className={stl.wrap}>
          {wrapped ? <>Развернуть &#8595;</> : <>Свернуть &#8593;</>}
        </button>
      )}
      <div className={stl.notes}>
        {!wrapped && notes.map((note) => <Note key={note.id} note={note} />)}
      </div>
    </div>
  );
}

export default NoteList;
