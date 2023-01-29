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
} from '../../utils/utils';
import TagList from '../../componets/TagList/TagList';
import Button from '../../componets/UI/buttons/button-big/ButtonBig';
import NoteService from '../../API/NoteService';
import useFetching from '../../hooks/useFetching';
import Loader from '../../componets/UI/Loader';
import { addNote, updateNote } from '../../store/notesReducer';
import FileForm from '../../componets/FileForm';

import stl from './editNote.module.scss';

function EditNote() {
  const { notes } = useSelector((state: IMainState) => state.notes);
  const dispatch = useDispatch();
  const params = useParams();
  const router = useNavigate();

  const [currentTags, setCurrentTags] = useState<string[]>([]);
  const [note, setNote] = useState<INote>(() => {
    if (params.id) {
      const currentNote = notes.find((note: INote) => note.id === params.id);

      if (currentNote) {
        return currentNote;
      } else {
        router('/error');
      }
    }

    return createNewNote();
  });

  const [content, setContent] = useState<string>(
    tagController(note.body.replaceAll('\n', '<br>')).content
  );
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);

  const [saveNote, isLoading, error] = useFetching<INote>(
    async (note: INote) => {
      if (note.id) {
        const response = await NoteService.update(note);
        dispatch(updateNote(response));
      } else {
        const response = await NoteService.create(note);
        dispatch(addNote(response));
      }

      !error && router('/notes');
    }
  );

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

  const handleExit = () => {
    if (!note.title && !note.body && !note.file) {
      router('/notes');
      return;
    }

    const preparedNote = { ...note, date: dayjs().format() };
    if (!note.title && note.body) {
      preparedNote.title =
        note.body.length < 25 ? note.body : note.body.slice(0, 24) + '...';
    }
    if (!note.title && !note.body) {
      preparedNote.title = 'Заголовок';
    }

    saveNote(preparedNote);
  };

  useEffect(() => {
    if (note.title) {
      let content = contentRef.current;
      content?.focus();

      const range = document.createRange();
      content && range.selectNodeContents(content);
      range.collapse(false);

      const sel = window.getSelection();
      sel && sel.removeAllRanges();
      sel && sel.addRange(range);
    } else {
      titleRef.current?.focus();
    }
  }, []);

  return (
    <div className={stl.edit}>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className={stl.upper}>
            <div className={stl.title}>
              <input
                value={note.title}
                onChange={(e) => setNote({ ...note, title: e.target.value })}
                type="text"
                ref={titleRef}
                placeholder="Введите заголовок..."
              />
            </div>
            <div onClick={handleExit} className={stl.close_btn}></div>
          </div>
          <ContentEditable
            innerRef={contentRef}
            html={content}
            onChange={handleChange}
            data-ph="Введите текст заметки..."
            className={stl.text}
          />
          {note.file && (
            <img
              src={note.file.url}
              alt={note.file.name}
              style={{ width: 100, height: 100, objectFit: 'contain' }}
            />
          )}
          <FileForm note={note} setNote={setNote} />
          <TagList
            choose={hightLightTag}
            remove={removeTag}
            current={currentTags}
            tags={note.tags}
            modClass={stl.tags}
          />
          <div className={stl.down}>
            <Button onClick={handleExit} modClass={stl.save_btn}>
              Сохранить
            </Button>
          </div>
        </div>
      )}
      {error && <h1>{error}</h1>}
    </div>
  );
}

export default EditNote;
