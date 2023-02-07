import { useState } from 'react';

import Header from '../../componets/Header/Header';
import RegistrationForm from '../../componets/UI/forms/RegistrationForm';
import LoginForm from '../../componets/UI/forms/LoginForm';
import stl from './loginPage.module.scss';


function LoginPage() {
  const [loginPage, setLoginPage] = useState(false);

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
