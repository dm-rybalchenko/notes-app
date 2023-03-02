import { useState } from 'react';

import Header from '../../componets/UI/header/Header';
import RegistrationForm from '../../componets/Forms/RegistrationForm/RegistrationForm';
import LoginForm from '../../componets/Forms/LoginForm/LoginForm';

import stl from './loginPage.module.scss';


function LoginPage(): JSX.Element {
  const [loginPage, setLoginPage] = useState<boolean>(true);

  return (
    <>
      <Header>
        <div className={stl.nav}>
          <button
            onClick={(): void => setLoginPage(true)}
            className={loginPage ? stl.active : ''}
          >
            Вход
          </button>
          &nbsp;/&nbsp;
          <button
            onClick={(): void => setLoginPage(false)}
            className={!loginPage ? stl.active : ''}
          >
            Регистрация
          </button>
        </div>
      </Header>
      <div className={stl.form}>
        {loginPage ? (
          <LoginForm />
        ) : (
          <RegistrationForm setLoginPage={setLoginPage} />
        )}
      </div>
    </>
  );
}

export default LoginPage;
