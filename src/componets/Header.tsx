import { useState } from 'react';

import { createNewNote } from '../utils/utils';
import { TagList } from './TagList';
import { TagForm } from './TagForm';
import { Button } from './UI/Button';

function Header({ newNote, tags, add, current, choose, remove }: IHeaderProps) {
  const [showTagForm, setShowTagForm] = useState(false);

  const openInput = () => {
    setShowTagForm(true);
  };

  return (
    <header className="header">
      <div className="header__upper">
        <div className="header__title">Заметки</div>
        <div className="header__add">
          <Button
            onClick={() => newNote(createNewNote())}
            modClass="header__btn"
          >
            Добавить заметку
          </Button>
        </div>
      </div>
      <div className="header__lower">
        <TagList
          choose={choose}
          remove={remove}
          tags={tags}
          current={current}
          modClass="header__tags"
        />
        {showTagForm && <TagForm add={add} show={setShowTagForm} />}
        <button onClick={openInput} className="header__tag-btn">
          + Добавить тег
        </button>
      </div>
    </header>
  );
}

export { Header };
