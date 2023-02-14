import { IButtonSmallProps } from './buttonSmall.types';

import stl from './buttonSmall.module.scss';


function ButtonSmall({
  children,
  modClass,
  ...props
}: IButtonSmallProps): JSX.Element {
  const rootClasses = [stl.button];

  if (modClass) {
    rootClasses.push(modClass);
  }

  return (
    <button {...props} className={rootClasses.join(' ')}>
      {children}
    </button>
  );
}

export default ButtonSmall;
