import { useEffect, useState } from 'react';

import { saveData, getData } from './API/localStorageService';
import { toggleBlockBody } from './utils/utils';
import { Header } from './componets/Header';
import { NoteList } from './componets/NoteList';
import { EditNote } from './componets/EditNote';

function App() {
  const [notes, setNotes] = useState<INote[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  const [noteForEdit, setNoteForEdit] = useState<INote | null>(null);
  const [currentNotes, setCurrentNotes] = useState<INote[]>([]);
  const [currentTags, setCurrentTags] = useState<string[]>([]);

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
    note.tags.forEach((item) => addTag(item));
  };

  const chooseTag = (tag: string) => {
    if (currentTags.includes(tag)) {
      setCurrentTags([...currentTags.filter((item) => item !== tag)]);
    } else {
      setCurrentTags((currentTags) => [...currentTags, tag]);
    }
  };

  const addTag = (tag: string) => {
    !tags.includes(tag) && setTags((tags) => [...tags, tag]);
  };

  const removeTag = (tag: string) => {
    setTags([...tags.filter((item) => item !== tag)]);

    setCurrentTags([...currentTags.filter((item) => item !== tag)]);
  };

  const filterNotes = () => {
    setCurrentNotes([
      ...notes.filter((item) => {
        let res = false;

        item.tags.forEach((tag: string) => {
          if (currentTags.includes(tag)) {
            res = true;
          }
        });

        return res;
      }),
    ]);
  };

  useEffect(() => {
    filterNotes();
  }, [currentTags]);

  useEffect(() => {
	const storedData = getData();

    setNotes(storedData.notes);
	setTags(storedData.tags);
    filterNotes();
  }, []);

  useEffect(() => {
    saveData(notes, tags);
  }, [notes, tags]);

  useEffect(() => {
    toggleBlockBody(noteForEdit);
  }, [noteForEdit]);

  return (
    <div className="wrapper">
      <Header
        newNote={setNoteForEdit}
        add={addTag}
        choose={chooseTag}
        remove={removeTag}
        tags={tags}
        current={currentTags}
      />
      <NoteList
        remove={removeNote}
        edit={editNote}
        notes={currentTags.length ? currentNotes : notes}
      />
      {noteForEdit && (
        <EditNote add={addNote} current={noteForEdit} close={setNoteForEdit} />
      )}
    </div>
  );
}

export default App;
