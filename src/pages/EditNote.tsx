import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  createNewNote,
  tagController,
  wrapChosenTag,
  wrapTag,
} from '../utils/utils';
import TagList from '../componets/TagList';
import Button from '../componets/UI/Button';
import NoteService from '../API/NoteService';
import useFetching from '../hooks/useFetching';
import Loader from '../componets/UI/Loader';
import { addNote, updateNote } from '../store/notesReducer';


function EditNote() {
  const notes = useSelector((state: IMainState) => state.notes.notes);
  const dispatch = useDispatch();
  const params = useParams();
  const router = useNavigate();

  const [currentTags, setCurrentTags] = useState<string[]>([]);
  const [content, setContent] = useState('');
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);

  const [note, setNote] = useState<INote>((): INote => {
    if (params.id === 'new') {
      return createNewNote();
    }

    const currentNote = notes.find((note: INote) => note.id === params.id);
    if (currentNote) {
      setContent(currentNote.body);
      return currentNote;
    }

    router('/error');
    return createNewNote();
  });

  const [saveNote, isLoading, error] = useFetching(async (note: INote) => {
    const preparedNote = { ...note, date: dayjs().format() };

    if (preparedNote.id) {
      const response = await NoteService.updateNote(preparedNote);
      dispatch(updateNote(response));
    } else {
      const response = await NoteService.createNote(preparedNote);
      dispatch(addNote(response));
    }

    router('/notes');
  });

  const hightLightTag = (tag: string) => {
    if (currentTags.includes(tag)) {
      setCurrentTags([...currentTags.filter((item) => item !== tag)]);

      setContent(content.replaceAll(wrapChosenTag(tag), wrapTag(tag)));
    } else {
      setCurrentTags([...currentTags, tag]);

      setContent(content.replaceAll(wrapTag(tag), wrapChosenTag(tag)));
    }
  };

  const removeTag = (tag: string) => {
    setNote({
      ...note,
      body: note.body.replaceAll(tag, tag.slice(1)),
      tags: [...note.tags.filter((item) => item !== tag)],
    });

    if (currentTags.includes(tag)) {
      setCurrentTags([...currentTags.filter((item) => item !== tag)]);
      setContent(content.replaceAll(wrapChosenTag(tag), tag.slice(1)));
    } else {
      setContent(content.replaceAll(wrapTag(tag), tag.slice(1)));
    }
  };

  const addTag = (newTag: string) => {
    !note.tags.includes(newTag) &&
      setNote({ ...note, tags: [...note.tags, newTag] });
  };

  const handleChange = (e: ContentEditableEvent) => {
    setNote({ ...note, body: contentRef.current!.innerText });

    let newContent = tagController(e.target.value);

    newContent.tag && addTag(newContent.tag);
    setContent(newContent.content);
  };

  useEffect(() => {
    if (note.title) {
      contentRef.current?.focus();
    } else {
      titleRef.current?.focus();
    }
  }, []);

  return (
    <>
      {error && <h1>{error}</h1>}
      {isLoading ? (
        <Loader />
      ) : (
        <div className="edit-note" onClick={(e) => e.stopPropagation()}>
          <div className="edit-note__up">
            <div className="edit-note__title">
              <input
                value={note.title}
                onChange={(e) => setNote({ ...note, title: e.target.value })}
                type="text"
                ref={titleRef}
                placeholder="Введите заголовок..."
              />
            </div>
            <div
              onClick={() => saveNote(note)}
              className="edit-note__close-up"
            ></div>
          </div>
          <ContentEditable
            innerRef={contentRef}
            html={content}
            onChange={handleChange}
            data-ph="Введите текст заметки..."
            className="edit-note__text"
          />
          <TagList
            choose={hightLightTag}
            remove={removeTag}
            current={currentTags}
            tags={note.tags}
            modClass="edit-note__tags"
          />
          <div className="edit-note__down">
            <Button onClick={() => saveNote(note)} modClass="edit-note__save">
              Сохранить
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default EditNote;
