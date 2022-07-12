import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Form } from '../../components/Form';
import { Input } from '../../components/Input';
import { schema } from '../../utils/validate';

type FormValues = {
  login: string;
  password: string;
};

const SignIn = () => {
  const defaultValues: FormValues = {
    login: '',
    password: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<FieldValues> = (data: unknown) => {
    if (isValid) {
      // eslint-disable-next-line no-alert
      alert(JSON.stringify(data));
    }
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
