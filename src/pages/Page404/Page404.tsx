import { Link } from 'react-router-dom';

import Header from '../../componets/UI/header/Header';
import ButtonBig from '../../componets/UI/buttons/button-big/ButtonBig';

import stl from './page404.module.scss';


export default function Page404(): JSX.Element {
  return (
    <>
      <Header>
        <div className={stl.nav}>
          <Link to="/login">Вход</Link>
          &nbsp;/&nbsp;
          <Link to="/login">Регистрация</Link>
        </div>
      </Header>
      <div className={stl.container}>
        <div className={stl.background}>404</div>
        <h2 className={stl.title}>Кажется, такой странички нет</h2>
        <Link className={stl.btn} to="/notes">
          <ButtonBig>На главную</ButtonBig>
        </Link>
      </div>
    </>
  );
}
