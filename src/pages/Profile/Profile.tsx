import { yupResolver } from '@hookform/resolvers/yup';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { TUserDTO } from '../../api/types';
import { userApi } from '../../api/userApi';
import { Button } from '../../components/Button';
import { Form } from '../../components/Form';
import { Input } from '../../components/Input';
import {
  clientToServerNaming,
  serverToClientNaming,
} from '../../utils/convertNaming';
import { notify, notifyError } from '../../utils/notify';
import { schemaProfile } from '../../utils/validate';
import ChangePassword from './components/ChangePassword';
import CropAvatar, { TOnSaveHandler } from './components/CropAvatar';

import styles from './Profile.module.css';

type TProfile = {
  login: string;
  email: string;
  phone: string;
  secondName: string;
  firstName: string;
  displayName?: string;
};

const Profile = () => {
  const navigate = useNavigate();

  const defaultValues: TProfile = {
    login: '',
    email: '',
    firstName: '',
    secondName: '',
    displayName: '',
    phone: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<TProfile>({
    mode: 'onChange',
    resolver: yupResolver(schemaProfile),
    defaultValues,
  });

  const [originAvatar, setOriginAvatar] = useState<ImageBitmap>();
  const [avatar, setAvatar] = useState<Blob>();
  const [showChangePassword, setShowChangePassword] = useState(false);

  const onSubmit: SubmitHandler<TProfile> = (data) => {
    if (isValid) {
      userApi
        .editUser(clientToServerNaming(data) as TUserDTO)
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

  const saveCropAvatarHandler: TOnSaveHandler = (image) => {
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
        reset(serverToClientNaming(data));
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
    <div className="container mx-auto flex flex-col justify-center items-center flex-nowrap h-full py-5">
      <input
        id="avatar"
        type="file"
        className="hidden"
        onChange={onAvatarClick}
      />
      <label htmlFor="avatar" className={styles.avatar}>
        {avatar && <img src={URL.createObjectURL(avatar)} alt="Аватар" />}
      </label>
      <Form handlerSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="Имя"
          {...register('firstName', { required: true })}
          error={errors.firstName}
        />
        <Input
          placeholder="Фамилия"
          {...register('secondName', { required: true })}
          error={errors.secondName}
        />
        <Input
          placeholder="Отображаемое имя"
          {...register('displayName', { required: true })}
          error={errors.displayName}
        />
        <Input
          placeholder="Логин"
          {...register('login', { required: true })}
          error={errors.login}
        />
        <Input
          placeholder="E-mail"
          {...register('email', { required: true })}
          type="tel"
          error={errors.email}
        />
        <Input
          placeholder="Телефон"
          cls="w-full"
          {...register('phone', { required: true })}
          type="tel"
          error={errors.phone}
        />
        <Button
          text="Сменить пароль"
          cls="mx-0 bg-gray-500 hover:bg-gray-700 w-full"
          onClick={() => setShowChangePassword(true)}
        />
        <div className="flex justify-between items-center mt-4">
          <Button cls="mx-0" text="Сохранить" type="submit" />

          <Button
            text="Выйти"
            cls="mx-0 bg-red-500 hover:bg-red-700"
            onClick={onLogout}
          />
        </div>
      </Form>

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
