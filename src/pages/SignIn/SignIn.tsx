import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';
import { setUserProfile } from '@/store/slices/userSlice';
import { schemaSignIn } from '@/utils/validate';
import { YandexLogin } from '@/components/YandexLogin';
import { Button } from '../../components/Button';
import { Form } from '../../components/Form';
import { Input } from '../../components/Input';
import userService from '../../services/userService';

const SignIn = () => {
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
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<typeof defaultValues>({
    mode: 'onChange',
    resolver: yupResolver(schemaSignIn),
    defaultValues,
  });

  const onSubmit: SubmitHandler<typeof defaultValues> = (d) => {
    userService.signIn(d).then((profile) => {
      if (profile) {
        dispatch(setUserProfile(profile));
        redirectToProfile();
      }
    });
  };

  return (
    <div className="container mx-auto flex flex-row justify-center items-center flex-wrap min-h-full py-5">
      <Form title="Вход" handlerSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="Логин"
          {...register('login', { required: true })}
          error={errors.login}
        />
        <Input
          placeholder="Пароль"
          type="password"
          {...register('password', { required: true })}
          error={errors.password}
        />
        <Button cls="w-full mt-12" text="Войти" type="submit" />
        <div className="w-full text-center mt-3">
          <Link
            className="font-bold underline hover:no-underline"
            to="/sign-up"
          >
            Нет аккаунта?
          </Link>
        </div>
        <div className="w-full text-center mt-3">
          <YandexLogin />
        </div>
      </Form>
    </div>
  );
};

export default SignIn;
