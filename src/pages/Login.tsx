import { useContext } from 'react';
import Button from '../componets/UI/Button';
import { AuthContext } from '../context';


function Login() {
  const { isAuth, setIsAuth } = useContext(AuthContext);

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuth(true);
    localStorage.setItem('auth', 'true');
  };

  return (
    <div className="login">
      <h1 className="login__title">Страница входа</h1>
      <form onSubmit={login} className="login__form">
        <input type="text" placeholder="Логин" className="header__tag-input" />
        <input
          type="password"
          placeholder="Пароль"
          className="header__tag-input"
        />
        <Button modClass="edit-note__save">Войти</Button>
      </form>
    </div>
  );
}

export default Login;
