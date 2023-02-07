import { useContext, useEffect, useState } from 'react';

import ButtonSmall from '../UI/buttons/button-small/ButtonSmall';
import IconDeleteTag from '../UI/icons/IconDeleteTag';
import btnStl from '../UI/buttons/button-small/buttonSmall.module.scss';
import { ModalContext } from '../../context';

import stl from './tagList.module.scss';


function TagList({ modClass, tags, current, choose, remove }: ITagListProps) {
  const [chosenTags, setChosenTags] = useState(current);
  const { setModal } = useContext(ModalContext);
  const rootClasses = [stl.tags];

  if (modClass) {
    rootClasses.push(modClass);
  }

  const handleRemove = (e: React.MouseEvent<HTMLSpanElement>, tag: string) => {
    e.stopPropagation();
    setModal({
      coords: { x: e.pageX, y: e.pageY },
      body: `«${tag}»`,
      title: 'Удалить тег?',
      callback: () => remove(tag),
    });
  };

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
          <span onClick={(e) => handleRemove(e, tag)} className={stl.delete}>
            <IconDeleteTag />
          </span>
        </ButtonSmall>
      ))}
    </div>
  );
}

export default TagList;
