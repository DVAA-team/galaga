import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { setUserProfile } from '@/store/slices/userSlice';
import { schemaSignUp } from '@/utils/validate';
import { useAuth } from '@/hooks/useAuth';
import { Header } from '@/components/Header';
import { MainLayout } from '@/components/MainLayout';
import { Button } from '../../components/Button';
import { Form } from '../../components/Form';
import { Input } from '../../components/Input';
import userService from '../../services/userService';

const SignUp = () => {
  const navigate = useNavigate();
  const userData = useAuth();
  const dispatch = useDispatch();

  const redirectToProfile = useCallback(() => {
    navigate('/profile', { replace: true });
  }, [navigate]);

  useEffect(() => {
    if (userData !== null) {
      redirectToProfile();
    }
  }, [redirectToProfile, userData]);

  const defaultValues = {
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
  } = useForm<typeof defaultValues>({
    mode: 'onChange',
    resolver: yupResolver(schemaSignUp),
    defaultValues,
  });

  const onSubmit: SubmitHandler<typeof defaultValues> = (d) => {
    userService.signUp(d).then((res) => {
      if (res) {
        navigate('/profile', { replace: true });
        dispatch(setUserProfile(res));
      }
    });
  };

  return (
    <>
      <Header />
      <MainLayout>
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
      </MainLayout>
    </>
  );
};

export default SignUp;
