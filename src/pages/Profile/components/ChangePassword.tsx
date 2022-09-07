import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '../../../components/Button';
import { Form } from '../../../components/Form';
import { Input } from '../../../components/Input';
import userService from '../../../services/userService';
import { schemaChangePassword } from '../../../utils/validate';

type TChangePasswordProps = {
  onClose: () => void;
};

const ChangePassword: FC<TChangePasswordProps> = ({ onClose }) => {
  const defaultValues = {
    newPassword: '',
    oldPassword: '',
    newPasswordRepeat: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<typeof defaultValues>({
    mode: 'onChange',
    resolver: yupResolver(schemaChangePassword),
    defaultValues,
  });

  const onSubmit: SubmitHandler<typeof defaultValues> = (data) => {
    if (isValid) {
      userService.editPassword(data).then((res) => {
        if (res) {
          onClose();
        }
      });
    }
  };

  return (
    <div className="fixed flex flex-row justify-center items-center w-full h-full backdrop-blur-md top-0 left-0 overflow-scroll py-5 box-border dark:text-gray-200">
      <div className="m-auto w-full max-w-md">
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
            {...register('newPasswordRepeat', { required: true })}
            error={errors.newPasswordRepeat}
          />
          <div className="flex justify-between w-full max-w-md ">
            <Button cls="mx-0" text="Применить" type="submit" />
            <Button
              cls="mx-0 bg-error backdrop-brightness-110 hover:backdrop-brightness-150"
              text="Отменить"
              type="submit"
              onClick={onClose}
            />
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ChangePassword;
