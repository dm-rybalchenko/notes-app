import { useEffect, useState } from 'react';

import { saveData, getData } from './API/localStorageService';
import { toggleBlockBody } from './utils/utils';
import { Header } from './componets/Header';
import { NoteList } from './componets/NoteList';
import { EditNote } from './componets/EditNote';
import useFilterNotes from './hooks/useFilterNotes';

function App() {
  const [notes, setNotes] = useState<INote[]>([]);
  const [noteForEdit, setNoteForEdit] = useState<INote | null>(null);
  const [filter, setFilter] = useState<IFilter>({
    tags: [],
    query: '',
    sort: '',
  });
  const filteredNotes = useFilterNotes(notes, filter);

  const editNote = (id: string) => {
    const noteToEdit = { ...notes.find((item) => item.id === id) } as INote;
    setNoteForEdit(noteToEdit);
  };

  const removeNote = (id: string) => {
    setNotes([...notes.filter((item) => item.id !== id)]);
  };

  const addNote = (id: string, note: INote) => {
    const newNotes = [...notes];
    const index = newNotes.findIndex((item) => item.id === id);

    if (index !== -1) {
      newNotes[index] = note;
    } else {
      newNotes.push(note);
    }

    setNotes(newNotes);
  };

  

  useEffect(() => {
    const storedData = getData();
    setNotes(storedData);
  }, []);

  useEffect(() => {
    saveData(notes);
  }, [notes]);

  useEffect(() => {
    toggleBlockBody(noteForEdit);
  }, [noteForEdit]);

  return (
    <div className="wrapper">
      <Header
        notes={notes}
        filter={filter}
        setFilter={setFilter}
        newNote={setNoteForEdit}
		setNotes={setNotes}
      />
      <NoteList remove={removeNote} edit={editNote} notes={filteredNotes} />
      {noteForEdit && (
        <EditNote add={addNote} current={noteForEdit} close={setNoteForEdit} />
      )}
    </div>
  );
}

export default App;
