import { useEffect, useRef, useState } from 'react';

import { TagList } from './TagList';
import { Button } from './UI/Button';

function Header({ tags, addNote, add, current, choose, remove }: IHeaderProps) {
  const [newTag, setNewTag] = useState<null | string>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const addTag = (e: React.KeyboardEvent) => {
    const tag = (e.target as HTMLInputElement).value;
	
    if (e.key === 'Enter' && tag.startsWith('#') && tag.length > 1) {
      newTag && add(newTag);
      setNewTag(null);
    }
  };

  const openInput = () => {
    setNewTag('#');
    setTimeout(() => inputRef.current!.focus(), 500);
  };

  const closeInput = (e: Event) => {
    const list = (e.target as HTMLElement).classList;

    !list.contains('header__tag-input') &&
      !list.contains('header__tag-btn') &&
      setNewTag(null);
};

useEffect(() => {
    document.addEventListener('click', (e) => closeInput(e));
  }, []);

  return (
    <header className="header">
      <div className="header__upper">
        <div className="header__title">Заметки</div>
        <div className="header__add">
          <Button onClick={addNote} modClass='header__btn'>
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
        {newTag && (
          <input
            ref={inputRef}
            onKeyDown={addTag}
            onChange={(e) => setNewTag(e.target.value)}
            value={newTag}
            className="header__tag-input"
          />
        )}
        <button onClick={openInput} className="header__tag-btn">
          + Добавить тег
        </button>
      </div>
    </header>
  );
}

export { Header };
