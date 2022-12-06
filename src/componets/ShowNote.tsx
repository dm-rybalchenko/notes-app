import { useState } from 'react';
import { TagList } from './TagList';


function ShowNote({ note, close }: IShowNoteProps) {
  const [hide, setHide] = useState(1);

  const closePopup = () => {
    setHide(0);
    setTimeout(() => close(null), 300);
  };

  return (
    <div style={{ opacity: hide }} className="edit-note__wrapper">
      <div className="edit-note">
        <div className="edit-note__up">
          <div className="edit-note__title">{note.title}</div>
          <button onClick={closePopup} className="edit-note__close">
            Закрыть
          </button>
        </div>
        <div className="edit-note__text">{note.body}</div>
        {note.tags && (
          <TagList
            icon={true}
            head={false}
            tags={note.tags}
            choose={() => {}}
          />
        )}
      </div>
    </div>
  );
}

export { ShowNote };
