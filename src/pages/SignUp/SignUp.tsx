import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { TSignUp } from '../../api/types';
import { userApi } from '../../api/userApi';
import { Button } from '../../components/Button';
import { Form } from '../../components/Form';
import { Input } from '../../components/Input';
import { TSnakeToCamelCaseNested } from '../../utils/convertNaming';
import { notifyError } from '../../utils/notify';
import { schemaSignUp } from '../../utils/validate';

const SignUp = () => {
  const navigate = useNavigate();

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
  } = useForm<TSignUp>({
    mode: 'onChange',
    resolver: yupResolver(schemaSignUp),
    defaultValues,
  });

  const onSubmit: SubmitHandler<TSignUp> = (d: TSignUp) => {
    userApi
      .signUp(d)
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
          {...register('first_name', { required: true })}
          error={errors.first_name}
        />
        <Input
          placeholder="Фамилия"
          {...register('second_name', { required: true })}
          error={errors.second_name}
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
          {...register('password_repeat', { required: true })}
          error={errors.password_repeat}
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
