import { useEffect, useState } from 'react';

import ButtonSmall from '../UI/buttons/button-small/ButtonSmall';
import IconDeleteTag from '../UI/icons/IconDeleteTag';
import stl from './tagList.module.scss';
import btnStl from '../UI/buttons/button-small/buttonSmall.module.scss'


function TagList({ modClass, tags, current, choose, remove }: ITagListProps) {
  const [chosenTags, setChosenTags] = useState(current);
	const rootClasses = [stl.tags]

	if(modClass) {
		rootClasses.push(modClass)
	}

  useEffect(() => {
    setChosenTags(current);
  }, [current]);

  return (
    <div className={rootClasses.join(' ')}>
      {tags.map((tag) => (
        <ButtonSmall
          key={tag}
          onClick={() => choose(tag)}
          modClass={chosenTags?.includes(tag) ? btnStl.active : ''}
        >
          {tag}
          <span
            onClick={(e) => {
              e.stopPropagation();
              remove && remove(tag);
            }}
            className={stl.delete}
          >
            <IconDeleteTag />
          </span>
        </ButtonSmall>
      ))}
    </div>
  );
}

export default TagList;
