import { ILoaderProps } from './loader.types';

import stl from './loader.module.scss';


export default function Loader({ gray }: ILoaderProps): JSX.Element {
  const rootClasses = [stl.outer];

  if (gray) {
    rootClasses.push(stl.gray);
  }

  return (
    <div className={stl.container}>
      <span className={rootClasses.join(' ')}>
        <span className={stl.left}>
          <span className={stl.anim} />
        </span>
        <span className={stl.right}>
          <span className={stl.anim} />
        </span>
      </span>
    </div>
  );
}
