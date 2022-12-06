import { useRef, useState } from 'react';

import { TagList } from './TagList';
import { Button } from './UI/Button';


function Header({ tags, addNote, add, current, choose, remove }: IHeaderProps) {
  const [newTag, setNewTag] = useState<null | string>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const addTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      newTag && add(newTag);
      setNewTag(null);
    }
  };

  const openInput = () => {
    setNewTag('#');
    setTimeout(() => inputRef.current!.focus(), 500);
  };

  return (
    <header className="header">
      <div className="header__upper">
        <div className="header__title">Заметки</div>
        <Button onClick={addNote} head={true}>
          Добавить заметку
        </Button>
      </div>
      <div className="header__lower">
        <TagList
          choose={choose}
          remove={remove}
          head={true}
          tags={tags}
          current={current}
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
