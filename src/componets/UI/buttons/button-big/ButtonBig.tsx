import { IButtonBigProps } from './buttonBig.types';

import stl from './buttonBig.module.scss';


function ButtonBig({
  children,
  modClass,
  ...props
}: IButtonBigProps): JSX.Element {
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

export default ButtonBig;
