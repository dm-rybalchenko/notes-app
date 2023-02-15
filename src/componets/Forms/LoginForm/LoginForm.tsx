import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import UserService from '../../../API/UserService';
import useFetching from '../../../hooks/useFetching';
import { setUser, setIsAuth } from '../../../store/reducers/authReducer';
import { EmailReg } from '../../../utils/utils';
import Input from '../../UI/input/Input';
import ButtonBig from '../../UI/buttons/button-big/ButtonBig';
import Loader from '../../UI/loader/Loader';
import { showError } from '../../../store/reducers/notificationReducer';

import { ILoginForm } from './loginForm.types';

import stl from '../forms.module.scss';


function LoginForm(): JSX.Element {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<ILoginForm>({
    shouldFocusError: false,
    reValidateMode: 'onSubmit',
  });

  const [login, isLoadingLogin, errLogin] = useFetching<string>(
    async (email: string, password: string) => {
      const response = await UserService.login(email, password);

      localStorage.setItem('token', response.accessToken);
      dispatch(setUser(response.user));
      dispatch(setIsAuth(true));
    },
  );

  const onLogin: SubmitHandler<ILoginForm> = (data) => {
    login(data.email, data.password);
  };

  useEffect(() => {
    errLogin && dispatch(showError(`Ошибка входа: ${errLogin}`));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errLogin]);

  if (isLoadingLogin) {
    return <Loader />;
  }

  return (
    <div>
      <h2 className={stl.title}>Войти</h2>
      <form onSubmit={handleSubmit(onLogin)} className={stl.form} noValidate>
        <Input
          register={register('email', {
            required: 'Нужно ввести ваш email',
            pattern: {
              value: EmailReg,
              message: 'Нужно ввести валидный email',
            },
          })}
          onFocus={(): void => clearErrors('email')}
          placeholder="Email"
          type="email"
          modClass={errors.email ? stl.error : ''}
        />
        {errors.email && (
          <div className={stl['errors-box']}>{errors.email.message}</div>
        )}
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
          onFocus={(): void => clearErrors('password')}
          placeholder="Пароль"
          type="password"
          modClass={errors.password ? stl.error : ''}
        />
        {errors.password && (
          <div className={stl['errors-box']}>{errors.password.message}</div>
        )}
        <ButtonBig modClass={stl.btn}>Войти</ButtonBig>
        <button onClick={(e): void => e.preventDefault()} className={stl['sub-btn']}>
          Забыли пароль?
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
