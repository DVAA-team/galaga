import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import userService from '../../services/userService';
import { TUserDTO } from '../../api/types';
import { Button } from '../../components/Button';
import { Form } from '../../components/Form';
import { Input } from '../../components/Input';
import { clientToServerNaming } from '../../utils/convertNaming';
import { schemaProfile } from '../../utils/validate';
import ChangePassword from './components/ChangePassword';
import CropAvatar, { TOnSaveHandler } from './components/CropAvatar';

import styles from './Profile.module.css';
import { setUser } from '../../store/slices/userSlice';

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
  const userData = useAuth();
  const dispatch = useDispatch();

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
      userService
        .editUser(clientToServerNaming(data) as TUserDTO)
        .then((user) => {
          dispatch(setUser({ user }));
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
    userService.logOut().then(() => {
      navigate('/', { replace: true });
      dispatch(setUser({ user: null }));
    });
  };

  const saveCropAvatarHandler: TOnSaveHandler = (image) => {
    setAvatar(image);
    setOriginAvatar(undefined);
    userService.editAvatar(image);
  };

  useEffect(() => {
    if (userData !== null) {
      reset(userData);
      const userAvatar = userData.avatar;

      if (userAvatar) {
        userService.getAvatar(userAvatar).then((res) => {
          setAvatar(res as Blob);
        });
      }
    }
  }, [userData, reset]);

  return (
    <div className="container mx-auto flex flex-row justify-center items-center flex-wrap min-h-full py-5">
      <div className="profile w-full max-w-md">
        <div className="profile__avatar mb-5">
          <input
            id="avatar"
            type="file"
            className="hidden"
            onChange={onAvatarClick}
          />
          <label htmlFor="avatar" className={styles.avatar}>
            {avatar && <img src={URL.createObjectURL(avatar)} alt="Аватар" />}
          </label>
        </div>
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
