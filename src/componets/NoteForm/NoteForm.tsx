import { useEffect, useRef } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import NoteService from '../../API/NoteService';
import {
  addTag,
  setHtmlContent,
  setNote,
} from '../../store/reducers/editNoteReducer';
import { tagController } from '../../utils/utils';

import stl from './noteForm.module.scss';


function NoteForm() {
  const { notes } = useSelector((state: IMainState) => state.notes);
  const { note, html } = useSelector((state: IMainState) => state.editNote);
  const dispatch = useDispatch();
  const params = useParams();
  const router = useNavigate();

  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ContentEditableEvent) => {
    dispatch(setNote({ ...note, body: contentRef.current!.innerText }));

    let newContent = tagController(e.target.value);

    newContent.tag && dispatch(addTag(newContent.tag));
    dispatch(setHtmlContent(newContent.content));
  };

  const setFocus = (title: string) => {
    if (title) {
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
  };

  useEffect(() => {
    async function fetchNote() {
      setFocus(note.title);

      if (params.id) {
        let currentNote = notes.find((note: INote) => note.id === params.id);

        if (!currentNote) {
          currentNote = await NoteService.getById(params.id);
        }

        if (currentNote?.id) {
          dispatch(setNote(currentNote));
          dispatch(
            setHtmlContent(
              tagController(currentNote.body.replaceAll('\n', '<br>')).content
            )
          );

          setFocus(currentNote.title);
        } else {
          router('/error');
        }
      }
    }

    fetchNote();
  }, []);

  return (
    <div>
      <div className={stl.title}>
        <input
          value={note.title}
          onChange={(e) =>
            dispatch(setNote({ ...note, title: e.target.value }))
          }
          type="text"
          ref={titleRef}
          placeholder="Введите заголовок..."
        />
      </div>
      <ContentEditable
        innerRef={contentRef}
        html={html}
        onChange={handleChange}
        data-ph="Введите текст заметки..."
        className={stl.text}
      />
    </div>
  );
}

export default NoteForm;
