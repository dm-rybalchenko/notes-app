import { IButtonBigProps } from './buttonBig.types';

import stl from './buttonBig.module.scss';


function ButtonBig({
  children,
  modClass,
  type,
  ...props
}: IButtonBigProps): JSX.Element {
  const rootClasses = [stl.button];

  if (modClass) {
    rootClasses.push(modClass);
  }

  return (
    <button {...props} type={type || 'button'} className={rootClasses.join(' ')}>
      {children}
    </button>
  );
}

export default ButtonBig;
