import { useEffect, useRef } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { useTypedSelector } from '../../hooks/useTypedSelector';
import NoteService from '../../API/NoteService';
import {
  addTag,
  setHtmlContent,
  setNote,
} from '../../store/reducers/editNoteReducer';
import { tagController } from '../../utils/utils';

import { INote } from './noteForm.types';

import stl from './noteForm.module.scss';


function NoteForm(): JSX.Element {
  const { notes } = useTypedSelector((state) => state.notes);
  const { note, html } = useTypedSelector((state) => state.editNote);
  const dispatch = useDispatch();
  const params = useParams();
  const router = useNavigate();

  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ContentEditableEvent): void => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    dispatch(setNote({ ...note, body: contentRef.current!.innerText }));

    const newContent = tagController(e.target.value);

    newContent.tag && dispatch(addTag(newContent.tag));
    dispatch(setHtmlContent(newContent.content));
  };

  const setFocus = (title: string): void => {
    if (title) {
      const content = contentRef.current;
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
    async function fetchNote(): Promise<void> {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className={stl.title}>
        <input
          value={note.title}
          onChange={(e): void => {
            dispatch(setNote({ ...note, title: e.target.value }));
          }}
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
