import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Form } from '../../components/Form';
import { Input } from '../../components/Input';
import { schemaSignIn } from '../../utils/validate';
import { userApi } from '../../api/userApi';
import { TSignIn } from '../../api/types';
import { notifyError } from '../../utils/notify';

const SignIn = () => {
  const navigate = useNavigate();

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
    userApi
      .signIn(d)
      .then(() => {
        navigate('/profile', { replace: true });
      })
      .catch(({ response }) => {
        const reason = response?.data?.reason;

        if (reason) {
          notifyError(reason);
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
