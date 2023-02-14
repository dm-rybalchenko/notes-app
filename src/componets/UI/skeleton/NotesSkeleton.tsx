import stl from './notesSkeleton.module.scss';


export default function NotesSkeleton(): JSX.Element {
  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div>
      <div className={stl.title} />
      <div className={stl.list}>
        <div className={stl.note} />
        <div className={stl.note} />
      </div>
      <hr className={stl.line} />
      <div className={stl.title} />
      <div className={stl.list}>
        {list.map((i) => (
          <div key={i} className={stl.note} />
        ))}
      </div>
    </div>
  );
}
