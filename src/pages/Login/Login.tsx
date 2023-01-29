import { useDispatch } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';

import UserService from '../../API/UserService';
import Button from '../../componets/UI/buttons/button-big/ButtonBig';
import Loader from '../../componets/UI/Loader';
import useFetching from '../../hooks/useFetching';
import { setIsAuth, setUser } from '../../store/authReducer';
import { EmailReg } from '../../utils/utils';

import stl from './login.module.scss';
import InputStl from '../../componets/UI/input/input.module.scss';
import stlBtn from '../EditNote/editNote.module.scss';

function Login() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();

  const [login, isLoadingLogin, errLogin] = useFetching<string>(
    async (email: string, password: string) => {
      const response = await UserService.login(email, password);

      localStorage.setItem('token', response.accessToken);
      dispatch(setUser(response.user));
      dispatch(setIsAuth(true));
    }
  );

  const [registration, isLoadingReg, errReg] = useFetching<string>(
    async (email: string, password: string) => {
      const response = await UserService.registration(email, password);

      localStorage.setItem('token', response.accessToken);
      dispatch(setUser(response.user));
      dispatch(setIsAuth(true));
    }
  );

  const onLogin: SubmitHandler<ILoginForm> = (data) => {
    login(data.email, data.password);
  };

  const onRegistration: SubmitHandler<ILoginForm> = (data) => {
    registration(data.email, data.password);
  };

  if (isLoadingLogin || isLoadingReg) {
    return <Loader />;
  }

  return (
    <div className={stl.login}>
      <h1 className={stl.title}>Страница входа</h1>
        <form onSubmit={handleSubmit(onLogin)} className={stl.form}>
          <input
            {...register('email', { required: true, pattern: EmailReg })}
            placeholder="Email"
            type="email"
			className={InputStl.input}
          />
          {errors.email?.type === 'required' && (
            <span>Нужно ввести ваш email в это поле</span>
          )}
          {errors.email?.type === 'pattern' && (
            <span>Нужно ввести валидный email</span>
          )}
          <input
            {...register('password', {
              required: true,
              minLength: 4,
              maxLength: 32,
            })}
            placeholder="Пароль"
            type="password"
			className={InputStl.input}
          />
          {errors.password?.type === 'required' && (
            <span>Нужно ввести пароль</span>
          )}
          {errors.password?.type === 'minLength' && (
            <span>Пароль должен быть минимум 4 символа</span>
          )}
          {errors.password?.type === 'maxLength' && (
            <span>Пароль должен быть не более 32х символов</span>
          )}
          <Button modClass={stlBtn.save_btn}>Войти</Button>
        </form>
		<div className={stl.registration}>
        <Button
          onClick={handleSubmit(onRegistration)}
          modClass={stlBtn.save_btn}
        >
          Зарегистрироваться
        </Button>
		</div>
      {errLogin && <h1>{errLogin}</h1>}
      {errReg && <h1>{errReg}</h1>}
    </div>
  );
}

export default Login;
