import { useEffect, useState } from 'react';

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

  const createNewNote = () => {
    const newNote = {
      id: Math.random().toString(36).substring(2, 6),
      title: '',
      body: '',
      tags: [],
    };

    setNoteForEdit(newNote);
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

  const downloadData = () => {
    localStorage.getItem('notes') !== null &&
      setNotes(JSON.parse(localStorage.getItem('notes') || '[]'));

    localStorage.getItem('tags') !== null &&
      setTags(JSON.parse(localStorage.getItem('tags') || '[]'));

    filterNotes();
  };

  useEffect(() => {
    filterNotes();
  }, [currentTags]);

  useEffect(() => {
    downloadData();
  }, []);

  useEffect(() => {
    notes.length && localStorage.setItem('notes', JSON.stringify(notes));
    tags.length && localStorage.setItem('tags', JSON.stringify(tags));
  }, [notes]);

  useEffect(() => {
    if (noteForEdit) {
      document.body.classList.add('block');
	  
    } else {
      document.body.classList.remove('block');
    }
  }, [noteForEdit]);

  return (
    <div className="wrapper">
      <Header
        add={addTag}
        choose={chooseTag}
        remove={removeTag}
        addNote={createNewNote}
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
