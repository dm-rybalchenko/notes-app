import { useEffect, useState } from 'react';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import UserService from '../../../API/UserService';
import useFetching from '../../../hooks/useFetching';
import { setUser, setIsAuth } from '../../../store/reducers/authReducer';
import { showError } from '../../../store/reducers/notificationReducer';
import { EmailReg } from '../../../utils/utils';
import ButtonBig from '../buttons/button-big/ButtonBig';
import Input from '../input/Input';
import Loader from '../loader/Loader';

import stl from './forms.module.scss';


function RegistrationForm({ setLoginPage }: IRegFormPorps) {
  const dispatch = useDispatch();
  const [fieldsErr, setFieldsErr] = useState<string[]>([
    'email',
    'password',
    'confirmPassword',
  ]);
  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<IRegForm>({
    shouldFocusError: false,
    reValidateMode: 'onSubmit',
  });

  const [registration, isLoadingReg, errReg] = useFetching<string>(
    async (email: string, password: string) => {
      const response = await UserService.registration(email, password);

      localStorage.setItem('token', response.accessToken);
      dispatch(setUser(response.user));
      dispatch(setIsAuth(true));
    }
  );

  const onRegistration: SubmitHandler<IRegForm> = (data) => {
    registration(data.email, data.password);
  };

  const onError: SubmitErrorHandler<typeof errors> = (data) => {
    setFieldsErr(Object.keys(data));
  };

  useEffect(() => {
    errReg && dispatch(showError(`Ошибка регистрации: ${errReg}`));
  }, [errReg]);

  if (isLoadingReg) {
    return <Loader />;
  }

  return (
    <div>
      <h2 className={stl.title}>Зарегистрироваться</h2>
      <form
        onSubmit={handleSubmit(onRegistration, onError)}
        className={stl.form}
        noValidate
      >
        {/* {errReg && <div className={stl.errors_box}>{errReg}</div>} */}
        <div className={!fieldsErr.includes('email') ? stl.success : ''}>
          <Input
            register={register('email', {
              required: 'Нужно ввести ваш email',
              pattern: {
                value: EmailReg,
                message: 'Нужно ввести валидный email',
              },
            })}
            onFocus={() => {
              clearErrors('email');
              setFieldsErr([...fieldsErr, 'email']);
            }}
            placeholder="Email"
            type="email"
            modClass={errors.email ? stl.error : ''}
          />
          {errors.email && (
            <div className={stl.errors_box}>{errors.email.message}</div>
          )}
        </div>
        <div className={!fieldsErr.includes('password') ? stl.success : ''}>
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
            onFocus={() => {
              clearErrors('password');
              setFieldsErr([...fieldsErr, 'password']);
            }}
            placeholder="Пароль"
            type="password"
            modClass={errors.password ? stl.error : ''}
          />
        </div>
        {errors.password && (
          <div className={stl.errors_box}>{errors.password.message}</div>
        )}
        <div
          className={!fieldsErr.includes('confirmPassword') ? stl.success : ''}
        >
          <Input
            register={register('confirmPassword', {
              required: 'Нужно подтвердить пароль',
              validate: (val: string) => {
                if (watch('password') !== val) return 'Пароли не совпадают';
              },
            })}
            onFocus={() => {
              clearErrors('confirmPassword');
              setFieldsErr([...fieldsErr, 'confirmPassword']);
            }}
            placeholder="Повторите пароль"
            type="password"
            modClass={errors.confirmPassword ? stl.error : ''}
          />
        </div>
        {errors.confirmPassword && (
          <div className={stl.errors_box}>{errors.confirmPassword.message}</div>
        )}
        <ButtonBig modClass={stl.btn}>Зарегистрироваться</ButtonBig>
        <button onClick={() => setLoginPage(true)} className={stl.sub_btn}>
          У меня уже есть аккаунт
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;
