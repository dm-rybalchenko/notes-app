import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import UserService from '../../../API/UserService';
import useFetching from '../../../hooks/useFetching';
import { setUser, setIsAuth } from '../../../store/reducers/authReducer';
import { EmailReg } from '../../../utils/utils';
import Input from '../input/Input';
import ButtonBig from '../buttons/button-big/ButtonBig';
import Loader from '../Loader';

import stl from './forms.module.scss';
import stlBtn from '../../../pages/EditNote/editNote.module.scss';

function LoginForm() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<ILoginForm>({
    shouldFocusError: false,
  });

  const [login, isLoadingLogin, errLogin] = useFetching<string>(
    async (email: string, password: string) => {
      const response = await UserService.login(email, password);

      localStorage.setItem('token', response.accessToken);
      dispatch(setUser(response.user));
      dispatch(setIsAuth(true));
    }
  );

  const onLogin: SubmitHandler<ILoginForm> = (data) => {
    login(data.email, data.password);
  };

  if (isLoadingLogin) {
    return <Loader />;
  }

  return (
    <div>
      <h2 className={stl.title}>Войти</h2>
      <form onSubmit={handleSubmit(onLogin)} className={stl.form} noValidate>
        {Boolean(Object.values(errors).length) && (
          <div className={stl.errors_box}>
            {Object.values(errors).map((err) => (
              <p key={err.message}>{err.message}</p>
            ))}
          </div>
        )}
        <Input
          register={register('email', {
            required: 'Нужно ввести ваш email',
            pattern: {
              value: EmailReg,
              message: 'Нужно ввести валидный email',
            },
          })}
          onFocus={() => clearErrors('email')}
          placeholder="Email"
          type="email"
          modClass={errors.email ? stl.error : ''}
        />
        <Input
          register={register('password', {
            required: 'Нужно ввести пароль',
            minLength: {
              value: 4,
              message: 'Пароль должен быть минимум 4 символа',
            },
            maxLength: {
              value: 32,
              message: 'Пароль должен быть не более 32х символов',
            },
          })}
          onFocus={() => clearErrors('password')}
          placeholder="Пароль"
          type="password"
          modClass={errors.password ? stl.error : ''}
        />
        <ButtonBig modClass={stlBtn.save_btn}>Войти</ButtonBig>
        <button onClick={(e) => e.preventDefault()} className={stl.sub_btn}>
          Забыли пароль?
        </button>
      </form>
      {errLogin && <h1>{errLogin}</h1>}
    </div>
  );
}

export default LoginForm;
