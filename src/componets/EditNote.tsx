import { useEffect, useRef, useState } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';

import { Button } from './UI/Button';
import { TagList } from './TagList';


function EditNote({ current, close, add }: IEditNoteProps) {
  const [hide, setHide] = useState(1);
  const [note, setNote] = useState(current);

  const [content, setContent] = useState(current.body);
  const contentRef = useRef<HTMLDivElement>(null);

  const [currentTags, setCurrentTags] = useState<string[]>([]);

  const closePopup = () => {
    setHide(0);
    setTimeout(() => close(null), 300);
  };

  const addNote = (id: string) => {
    add(id, note);
    closePopup();
  };

  const handleChange = (e: ContentEditableEvent) => {
    setNote({ ...note, body: contentRef.current!.innerText });
    setContent(e.target.value);
  };

  const hightLightTag = (tag: string) => {
	
    if (currentTags.includes(tag)) {
      setCurrentTags([...currentTags.filter((item) => item !== tag)]);

      setContent(
        content.replaceAll(
          `<span class="chosen">${tag}</span>`,
          `<span class="tag">${tag}</span>`
        )
      );

    } else {
      setCurrentTags([...currentTags, tag]);

      setContent(
        content.replaceAll(
          `<span class="tag">${tag}</span>`,
          `<span class="chosen">${tag}</span>`
        )
      );
    }
  };

  const removeTag = (tag: string) => {
    const newNote = {
      ...note,
      body: note.body.replaceAll(tag, tag.slice(1)),
      tags: [...note.tags.filter((item) => item !== tag)],
    };

    setNote(newNote);

    if (currentTags.includes(tag)) {
      setCurrentTags([...currentTags.filter((item) => item !== tag)]);

      setContent(
        content.replaceAll(`<span class="chosen">${tag}</span>`, tag.slice(1))
      );

    } else {
      setContent(
        content.replaceAll(`<span class="tag">${tag}</span>`, tag.slice(1))
      );
    }
  };

  const addTag = (str: string, p: string) => {
    const newTag = p.slice(0, -1).replace('&nbsp;', '');

    !note.tags.includes(newTag) &&
      setNote({ ...note, tags: [...note.tags, newTag] });

    return `<span class="tag">${newTag}</span> `;
  };

  useEffect(() => {
    setContent(content.replace(/((?<!>)#\S+\s(?<!>\s))/gm, addTag));
  }, [content]);

  return (
    <div style={{ opacity: hide }} className="edit-note__wrapper">
      <div className="edit-note">
        <div className="edit-note__up">
          <div className="edit-note__title">
            <input
              value={note.title}
              onChange={(e) => setNote({ ...note, title: e.target.value })}
              type="text"
              placeholder="Введите заголовок..."
            />
          </div>
          <button onClick={closePopup} className="edit-note__close">
            Закрыть
          </button>
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
          head={false}
          tags={note.tags}
        />
        <Button onClick={() => addNote(note.id)} head={false}>
          Сохранить
        </Button>
      </div>
    </div>
  );
}

export { EditNote };
