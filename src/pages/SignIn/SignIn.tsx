import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '@/hooks/store';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { setUserProfile } from '@/store/slices/userSlice';
import { schemaSignIn } from '@/utils/validate';
import { YandexLogin } from '@/components/YandexLogin';
import { Header } from '@/components/Header';
import { MainLayout } from '@/components/MainLayout';
import { Button } from '../../components/Button';
import { Form } from '../../components/Form';
import { Input } from '../../components/Input';
import userService from '../../services/userService';
import { TLocationProps } from './types';

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { state } = useLocation() as TLocationProps;
  const from = state?.from?.pathname || '/';

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
        navigate(from, { replace: true });
      }
    });
  };

  return (
    <>
      <Header />
      <MainLayout>
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
            <YandexLogin />
          </div>
          <div className="w-full text-center mt-3">
            <Link
              className="font-bold underline hover:no-underline dark:text-white"
              to="/sign-up"
            >
              Нет аккаунта?
            </Link>
          </div>
        </Form>
      </MainLayout>
    </>
  );
};

export default SignIn;
