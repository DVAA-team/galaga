import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setUser } from '../../store/slices/userSlice';
import userService from '../../services/userService';
import { Button } from '../../components/Button';
import { Form } from '../../components/Form';
import { Input } from '../../components/Input';
import { schemaSignIn } from '../../utils/validate';
import { TSignIn } from '../../api/types';
import { useAuth } from '../../hooks/useAuth';

const SignIn = () => {
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

  const defaultValues: TSignIn = {
    login: '',
    password: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignIn>({
    mode: 'onChange',
    resolver: yupResolver(schemaSignIn),
    defaultValues,
  });

  const onSubmit: SubmitHandler<TSignIn> = (d: TSignIn) => {
    userService.signIn(d).then((user) => {
      if (user) {
        dispatch(setUser({ user }));
        redirectToProfile();
      }
    });
  };

  return (
    <div className="container mx-auto flex flex-row justify-center items-center flex-wrap h-full">
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
      </Form>
    </div>
  );
};

export default SignIn;
