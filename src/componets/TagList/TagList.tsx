import { useContext, useEffect, useState } from 'react';

import ButtonSmall from '../UI/buttons/button-small/ButtonSmall';
import IconDeleteTag from '../UI/icons/IconDeleteTag';
import { ModalContext } from '../../context';

import { ITagListProps } from './tagList.types';
import { IModalContext } from '../../interfaces/context.types';

import btnStl from '../UI/buttons/button-small/buttonSmall.module.scss';
import stl from './tagList.module.scss';


function TagList({
  modClass,
  tags,
  current,
  choose,
  remove,
}: ITagListProps): JSX.Element {
  const [chosenTags, setChosenTags] = useState<string[] | undefined>(current);
  const { setModal } = useContext<IModalContext>(ModalContext);
  const rootClasses = [stl.tags];

  if (modClass) {
    rootClasses.push(modClass);
  }

  const handleRemove = (
    e: React.MouseEvent<HTMLSpanElement>,
    tag: string
  ): void => {
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
          onClick={(): void => choose(tag)}
          modClass={chosenTags?.includes(tag) ? btnStl.active : ''}
        >
          {tag}
          <span
            onClick={(e): void => handleRemove(e, tag)}
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
