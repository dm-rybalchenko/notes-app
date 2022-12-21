import { useEffect, useRef, useState } from 'react';


function TagForm({ show, add }: ITagFormProps) {
  const [newTag, setNewTag] = useState<string>('#');
  const inputRef = useRef<HTMLInputElement>(null);

  const closeInput = (e: Event) => {
    const list = (e.target as HTMLElement).classList;

    !list.contains('header__tag-input') &&
      !list.contains('header__tag-btn') &&
      show(false);
  };

  const addTag = (e: React.KeyboardEvent) => {
    const tag = (e.target as HTMLInputElement).value;

    if (e.key === 'Enter' && tag.startsWith('#') && tag.length > 1) {
      newTag && add(newTag);
      show(false);
    }
  };

  useEffect(() => {
    inputRef.current!.focus();
    document.addEventListener('click', (e) => closeInput(e));
  }, []);

  useEffect(() => {
    !newTag.length && show(false);
  }, [newTag]);

  return (
    <div>
      <input
        ref={inputRef}
        onKeyDown={addTag}
        onChange={(e) => setNewTag(e.target.value)}
        value={newTag}
        className="header__tag-input"
      />
    </div>
  );
}


export { TagForm }