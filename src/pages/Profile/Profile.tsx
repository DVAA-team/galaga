import { yupResolver } from '@hookform/resolvers/yup';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { TUserDTO } from '../../api/types';
import { userApi } from '../../api/userApi';
import { Button } from '../../components/Button';
import { Form } from '../../components/Form';
import { Input } from '../../components/Input';
import { notify, notifyError } from '../../utils/notify';
import { schemaProfile } from '../../utils/validate';
import ChangePassword from './components/ChangePassword';
import CropAvatar, { onSaveHandler } from './components/CropAvatar';

import styles from './Profile.module.css';

type Profile = {
  login: string;
  email: string;
  phone: string;
  second_name: string;
  first_name: string;
  display_name?: string;
};

const Profile = () => {
  const navigate = useNavigate();

  const defaultValues: Profile = {
    login: '',
    email: '',
    first_name: '',
    second_name: '',
    display_name: '',
    phone: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<Profile>({
    mode: 'onChange',
    resolver: yupResolver(schemaProfile),
    defaultValues,
  });

  const [originAvatar, setOriginAvatar] = useState<ImageBitmap>();
  const [avatar, setAvatar] = useState<Blob>();
  const [showChangePassword, setShowChangePassword] = useState(false);

  const onSubmit: SubmitHandler<FieldValues> = (data: unknown) => {
    if (isValid) {
      userApi
        .editUser(data as TUserDTO)
        .then(() => {
          notify('Профиль обновлен');
        })
        .catch(({ response }) => {
          const reason = response?.data?.reason;

          if (reason) {
            notifyError(reason);
          }
        });
    }
  };

  const onAvatarClick: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { files } = event.target;
    if (files && files.length === 1) {
      createImageBitmap(files[0]).then((img) => {
        setOriginAvatar(img);
      });
      // eslint-disable-next-line no-param-reassign
      event.target.value = '';
    }
  };

  const onLogout = () => {
    userApi
      .logOut()
      .then(() => {
        navigate('/', { replace: true });
      })
      .catch(({ response }) => {
        const reason = response?.data?.reason;

        if (reason) {
          notifyError(reason);
        }
      });
  };

  const saveCropAvatarHandler: onSaveHandler = (image) => {
    setAvatar(image);
    setOriginAvatar(undefined);
    userApi
      .editAvatar(image)
      .then(() => {
        notify('Аватар обновлен');
      })
      .catch(({ response }) => {
        const reason = response?.data?.reason;

        if (reason) {
          notifyError(reason);
        }
      });
  };

  useEffect(() => {
    userApi
      .getUser()
      .then(({ data }) => {
        reset(data);
        if (data.avatar) {
          userApi
            .getAvatar(data.avatar)
            .then((res) => {
              setAvatar(res.data);
            })
            .catch(({ response }) => {
              const reason = response?.data?.reason;

              if (reason) {
                notifyError(reason);
              }
            });
        }
      })
      .catch(({ response }) => {
        const reason = response?.data?.reason;

        if (reason) {
          notifyError(reason);
        }
      });
  }, []);

  return (
    <div className="container mx-auto flex flex-col justify-center items-center flex-wrap h-full">
      <input
        id="avatar"
        type="file"
        className={`hidden`}
        onChange={onAvatarClick}
      />
      <label htmlFor="avatar" className={`${styles.avatar} overflow-hidden`}>
        {avatar && <img src={URL.createObjectURL(avatar)} alt="Аватар" />}
      </label>
      <Form handlerSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="Имя"
          withLabel={true}
          {...register('first_name', { required: true })}
          error={errors.first_name}
        />
        <Input
          placeholder="Фамилия"
          withLabel={true}
          {...register('second_name', { required: true })}
          error={errors.second_name}
        />
        <Input
          placeholder="Отображаемое имя"
          withLabel={true}
          {...register('display_name', { required: true })}
          error={errors.display_name}
        />
        <Input
          placeholder="Логин"
          withLabel={true}
          {...register('login', { required: true })}
          error={errors.login}
        />
        <Input
          placeholder="E-mail"
          withLabel={true}
          {...register('email', { required: true })}
          type="tel"
          error={errors.email}
        />
        <Input
          placeholder="Телефон"
          withLabel={true}
          {...register('phone', { required: true })}
          type="tel"
          error={errors.phone}
        />
        <Button cls="w-full mt-12" text="Сохранить" type="submit" />
      </Form>
      <div className="flex justify-between w-full max-w-md pt-9">
        <Button
          text="Сменить пароль"
          cls="mx-0 bg-gray-500 hover:bg-gray-700"
          onClick={() => setShowChangePassword(true)}
        />
        <Button
          text="Выйти"
          cls="mx-0 bg-red-500 hover:bg-red-700"
          onClick={onLogout}
        />
      </div>
      {originAvatar && (
        <CropAvatar
          image={originAvatar}
          onSave={saveCropAvatarHandler}
          size={192}
          border={50}
        />
      )}
      {showChangePassword && (
        <ChangePassword onClose={() => setShowChangePassword(false)} />
      )}
    </div>
  );
};

export default Profile;
