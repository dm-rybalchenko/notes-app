import { useState } from 'react';

import Header from '../../componets/Header/Header';
import RegistrationForm from '../../componets/UI/forms/registration-form/RegistrationForm';
import LoginForm from '../../componets/UI/forms/login-form/LoginForm';
import stl from './loginPage.module.scss';


function LoginPage(): JSX.Element {
  const [loginPage, setLoginPage] = useState<boolean>(false);

  return (
    <>
      <Header>
        <div className={stl.nav}>
          <button
            onClick={() => setLoginPage(true)}
            className={loginPage ? stl.active : ''}
          >
            Вход
          </button>
          &nbsp;/&nbsp;
          <button
            onClick={() => setLoginPage(false)}
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
