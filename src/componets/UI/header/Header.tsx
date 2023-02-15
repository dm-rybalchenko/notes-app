import { Link } from 'react-router-dom';

import ButtonBig from '../buttons/button-big/ButtonBig';
import IconLogo from '../icons/IconLogo';

import { IHeaderPorps } from './header.types';

import stl from './header.module.scss';


function Header({ children, main }: IHeaderPorps): JSX.Element {
  return (
    <header className={stl.header}>
      <div className={stl.container}>
        <Link to="/" className={stl.logo}>
          <IconLogo />
        </Link>
        {main ? (
          <>
            {children}
            <div className={stl['add-note']}>
              <Link to="/edit">
                <ButtonBig modClass={stl.btn}>
                  <span>Добавить заметку</span>
                </ButtonBig>
              </Link>
            </div>
          </>
        ) : (
          <div className={stl.children}>{children}</div>
        )}
      </div>
    </header>
  );
}

export default Header;
