import stl from './footer.module.scss';


export default function Footer(): JSX.Element {
  return (
    <footer className={stl.footer}>
      <div className={stl.left}></div>
      <div className={stl.logo}>
        <p>Note App © {new Date().getFullYear()}</p>
        <p className={stl.subtitle}>Тестовая версия</p>
      </div>
      <div className={stl.develop}>
        <p className={stl.develop_title}>Дизайн:</p>
        <p>Ivan Bursky</p>
        <p className={stl.develop_title}>Разработка:</p>
        <p>Dmitry Rybalchenko</p>
      </div>
    </footer>
  );
}
