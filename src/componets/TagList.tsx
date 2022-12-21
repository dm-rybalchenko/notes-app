import { useEffect, useState } from 'react';

import IConCloseTag from './UI/IconCloseTag';


function TagList({ modClass, tags, current, choose, remove }: ITagListProps) {
  const [chosenTags, setChosenTags] = useState(current);

  useEffect(() => {
    setChosenTags(current);
  }, [current]);

  return (
    <div className={'tags ' + modClass}>
      {tags.map((tag) => (
        <div
          key={tag}
          onClick={() => choose(tag)}
          className={
            'tags__item' + (chosenTags?.includes(tag) ? ' active' : '')
          }
        >
          {tag}
          <button
            onClick={(e) => {
              e.stopPropagation();
              remove && remove(tag);
            }}
            className="tags__item-close"
          >
            <IConCloseTag />
          </button>
        </div>
      ))}
    </div>
  );
}

export { TagList };
