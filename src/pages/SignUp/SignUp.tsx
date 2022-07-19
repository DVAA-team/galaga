import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { TSignUp } from '../../api/types';
import { Button } from '../../components/Button';
import { Form } from '../../components/Form';
import { Input } from '../../components/Input';
import {
  clientToServerNaming,
  TSnakeToCamelCaseNested,
} from '../../utils/convertNaming';
import { schemaSignUp } from '../../utils/validate';
import { useAuth } from '../../hooks/useAuth';
import { setUser } from '../../store/slices/userSlice';
import userService from '../../services/userService';

const SignUp = () => {
  const navigate = useNavigate();
  const userData = useAuth();
  const dispatch = useDispatch();

  const redirectToProfile = () => {
    navigate('/profile', { replace: true });
  };

  useEffect(() => {
    if (userData !== null) {
      redirectToProfile();
    }
  }, [redirectToProfile, userData]);

  const defaultValues: TSnakeToCamelCaseNested<TSignUp> = {
    login: '',
    password: '',
    passwordRepeat: '',
    email: '',
    firstName: '',
    secondName: '',
    phone: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSnakeToCamelCaseNested<TSignUp>>({
    mode: 'onChange',
    resolver: yupResolver(schemaSignUp),
    defaultValues,
  });

  const onSubmit: SubmitHandler<TSnakeToCamelCaseNested<TSignUp>> = (d) => {
    userService.signUp(clientToServerNaming(d) as TSignUp).then(() => {
      navigate('/profile', { replace: true });
      dispatch(setUser({ user: d }));
    });
  };

  return (
    <div className="container mx-auto flex flex-row justify-center items-center flex-wrap min-h-full py-5">
      <Form title="Регистрация" handlerSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="Email"
          {...register('email', { required: true })}
          error={errors.email}
        />
        <Input
          placeholder="Логин"
          {...register('login', { required: true })}
          error={errors.login}
        />
        <Input
          placeholder="Имя"
          {...register('firstName', { required: true })}
          error={errors.firstName}
        />
        <Input
          placeholder="Фамилия"
          {...register('secondName', { required: true })}
          error={errors.secondName}
        />
        <Input
          placeholder="Телефон"
          {...register('phone', { required: true })}
          type="tel"
          error={errors.phone}
        />
        <Input
          placeholder="Пароль"
          type="password"
          {...register('password', { required: true })}
          error={errors.password}
        />
        <Input
          placeholder="Пароль еще раз"
          type="password"
          {...register('passwordRepeat', { required: true })}
          error={errors.passwordRepeat}
        />
        <Button cls="w-full mt-12" text="Зарегистрироваться" type="submit" />
        <div className="w-full text-center mt-3">
          <Link
            className="font-bold underline hover:no-underline"
            to="/sign-in"
          >
            Войти
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default SignUp;
