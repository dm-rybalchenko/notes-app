import stl from './loader.module.scss';


export default function Loader(): JSX.Element {
  return (
    <div className={stl.container}>
      <span className={stl.outer}>
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
