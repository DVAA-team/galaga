import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TChangePassword } from '../../../api/types';
import { userApi } from '../../../api/userApi';
import { Button } from '../../../components/Button';
import { Form } from '../../../components/Form';
import { Input } from '../../../components/Input';
import { notifyError } from '../../../utils/notify';
import { schemaChangePassword } from '../../../utils/validate';

type ChangePasswordProps = {
  onClose: () => void;
};

const ChangePassword: FC<ChangePasswordProps> = ({ onClose }) => {
  const defaultValues: TChangePassword = {
    newPassword: '',
    oldPassword: '',
    newPassword_repeat: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TChangePassword>({
    mode: 'onChange',
    resolver: yupResolver(schemaChangePassword),
    defaultValues,
  });

  const onSubmit: SubmitHandler<TChangePassword> = (data) => {
    if (isValid) {
      userApi
        .editPassword(data)
        .then(() => {
          onClose();
        })
        .catch(({ response }) => {
          const reason = response?.data?.reason;

          if (reason) {
            notifyError(reason);
          }
        });
    }
  };

  return (
    <div className="fixed flex justify-center items-center w-full h-full backdrop-blur-md">
      <Form title="Смените пароль" handlerSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="Старый пароль"
          withLabel={true}
          type="password"
          {...register('oldPassword', { required: true })}
          error={errors.oldPassword}
        />
        <Input
          placeholder="Новый пароль"
          withLabel={true}
          type="password"
          {...register('newPassword', { required: true })}
          error={errors.newPassword}
        />
        <Input
          placeholder="Новый пароль (еще раз)"
          withLabel={true}
          type="password"
          {...register('newPassword_repeat', { required: true })}
          error={errors.newPassword_repeat}
        />
        <div className="flex justify-between w-full max-w-md ">
          <Button cls="mx-0" text="Применить" type="submit" />
          <Button
            cls="mx-0 bg-red-500 hover:bg-red-700"
            text="Отменить"
            type="submit"
            onClick={onClose}
          />
        </div>
      </Form>
    </div>
  );
};

export default ChangePassword;
