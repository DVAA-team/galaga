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
  password_repeat: string;
  email: string;
  first_name: string;
  second_name: string;
  phone: string;
};

const SignUp = () => {
  const defaultValues: FormValues = {
    login: '',
    password: '',
    password_repeat: '',
    email: '',
    first_name: '',
    second_name: '',
    phone: '',
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
      <Form title="Регистрация" handlerSubmit={handleSubmit(onSubmit)}>
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
