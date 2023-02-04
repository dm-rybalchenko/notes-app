import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import UserService from '../../../API/UserService';
import useFetching from '../../../hooks/useFetching';
import { setUser, setIsAuth } from '../../../store/reducers/authReducer';
import { EmailReg } from '../../../utils/utils';
import ButtonBig from '../buttons/button-big/ButtonBig';
import Input from '../input/Input';
import Loader from '../Loader';

import stl from './forms.module.scss';
import stlBtn from '../../../pages/EditNote/editNote.module.scss';


function RegistrationForm({ setLoginPage }: IRegFormPorps) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<IRegForm>({
    shouldFocusError: false,
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

  if (isLoadingReg) {
    return <Loader />;
  }

  return (
    <div>
      <h2 className={stl.title}>Зарегистрироваться</h2>
      <form
        onSubmit={handleSubmit(onRegistration)}
        className={stl.form}
        noValidate
      >
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
        <Input
          register={register('confirmPassword', {
            required: 'Нужно подтвердить пароль',
            validate: (val: string) => {
              if (watch('password') !== val) {
                return 'Пароли не совпадают';
              }
            },
          })}
          onFocus={() => clearErrors('confirmPassword')}
          placeholder="Повторите пароль"
          type="password"
          modClass={errors.confirmPassword ? stl.error : ''}
        />
        <ButtonBig modClass={stlBtn.save_btn}>Зарегистрироваться</ButtonBig>
        <button onClick={() => setLoginPage(true)} className={stl.sub_btn}>
          У меня уже есть аккаунт
        </button>
      </form>

      {errReg && <h1>{errReg}</h1>}
    </div>
  );
}

export default RegistrationForm;
