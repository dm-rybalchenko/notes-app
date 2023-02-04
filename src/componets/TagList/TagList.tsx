import { useEffect, useState } from 'react';

import ButtonSmall from '../UI/buttons/button-small/ButtonSmall';
import IconDeleteTag from '../UI/icons/IconDeleteTag';
import stl from './tagList.module.scss';
import btnStl from '../UI/buttons/button-small/buttonSmall.module.scss';
import { useDispatch } from 'react-redux';
import { setModal } from '../../store/reducers/modalReducer';


function TagList({ modClass, tags, current, choose, remove }: ITagListProps) {
  const [chosenTags, setChosenTags] = useState(current);
  const dispatch = useDispatch();
  const rootClasses = [stl.tags];

  if (modClass) {
    rootClasses.push(modClass);
  }

  const handleRemove = (
    e: React.MouseEvent<HTMLSpanElement>,
    tag: string
  ) => {
    e.stopPropagation();
    remove &&
      dispatch(
        setModal({
          coords: { x: e.pageX, y: e.pageY },
          body: `«${tag}»`,
          title: 'Удалить тег из всех заметок?',
          callback: () => remove(tag),
        })
      );
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
