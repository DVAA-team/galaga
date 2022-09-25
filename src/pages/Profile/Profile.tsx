import { yupResolver } from '@hookform/resolvers/yup';
import { ChangeEventHandler, useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';
import { schemaProfile } from '@/utils/validate';
import { TUser } from '@/services/types';
import { setUserProfile } from '@/store/slices/userSlice';
import { MainLayout } from '@/components/MainLayout';
import { Header } from '@/components/Header';
import { notifyError } from '@/utils/notify';
import Select from '@/components/Select/Select';
import { useAppSelector, useAppDispatch } from '@/hooks/store';
import { useTheme } from '@/hooks/useTheme';
import themeService from '@/services/themeService';
import { setThemeList } from '@/store/slices/themesSlice';
import { useCSRFToken } from '@/hooks/useCSRFToken';
import { Button } from '../../components/Button';
import { Form } from '../../components/Form';
import { Input } from '../../components/Input';
import userService from '../../services/userService';
import ChangePassword from './components/ChangePassword';
import CropAvatar, { TOnSaveHandler } from './components/CropAvatar';

import styles from './Profile.module.css';

type TProfile = Omit<TUser, 'id' | 'avatar' | 'isOAuth2User'> & {
  theme: number;
};

const Profile = () => {
  const navigate = useNavigate();
  const userData = useAuth();
  const dispatch = useAppDispatch();
  const token = useCSRFToken();
  const [currentTheme, setCurrentTheme] = useTheme();
  const [isOAuth2User, setIsOAuth2User] = useState<boolean>(
    userData?.isOAuth2User ?? true
  );

  const themes = useAppSelector((state) => state.themes.list);

  const redirectToHome = useCallback(() => {
    navigate('/', { replace: true });
  }, [navigate]);

  const defaultValues: TProfile = {
    login: '',
    email: '',
    firstName: '',
    secondName: '',
    displayName: '',
    phone: '',
    theme: -1,
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
      const { theme: themeId, ...userProfile } = data;

      userService.setCSRFToken(token);

      userService.editUser(userProfile).then((profile) => {
        if (profile) {
          themeService.setCSRFToken(token);
          themeService.editUserTheme(themeId);
          dispatch(setUserProfile(profile));
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
    userService.setCSRFToken(token);

    userService.logOut().finally(() => {
      dispatch(setUserProfile(null));
      redirectToHome();
    });
  };

  const saveCropAvatarHandler: TOnSaveHandler = (image) => {
    userService.setCSRFToken(token);

    userService.editAvatar(image).then((res) => {
      if (res) {
        setAvatar(image);
        setOriginAvatar(undefined);
      }
    });
  };

  const onThemeChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const selectedThemeId = Number(event.currentTarget.value);
    try {
      const selectedTheme = themes.find(({ id }) => id === selectedThemeId);
      if (!selectedTheme) {
        throw new Error('Тема не найдена');
      }
      setCurrentTheme(selectedTheme);
    } catch (error) {
      if (error instanceof Error) {
        notifyError(error.message);
      } else {
        notifyError('Неизвестная ошибка');
      }
      reset({ theme: -1 });
    }
  };

  useEffect(() => {
    if (userData !== null) {
      reset(userData);
      const { avatar: userAvatar, isOAuth2User: isOAuth2UserSrv } = userData;

      setIsOAuth2User(isOAuth2UserSrv);

      if (userAvatar) {
        userService.getAvatar(userAvatar).then((res) => {
          if (res) {
            setAvatar(res);
          }
        });
      }
    }
  }, [userData, reset]);

  useEffect(() => {
    themeService.fetchThemes().then((themeList) => {
      if (themeList) {
        reset({ theme: currentTheme.id });
        dispatch(setThemeList(themeList));
      }
    });
  }, [currentTheme.id, dispatch, reset]);

  return (
    <>
      <Header />
      <MainLayout>
        <div className="container mx-auto flex flex-row justify-center items-center flex-wrap min-h-full py-5">
          <div className="w-full max-w-md">
            <div className="mb-5">
              <input
                id="avatar"
                type="file"
                className="hidden"
                onChange={onAvatarClick}
              />
              <label htmlFor="avatar" className={styles.avatar}>
                {avatar && (
                  <img src={URL.createObjectURL(avatar)} alt="Аватар" />
                )}
              </label>
            </div>
            <Form title="Профиль" handlerSubmit={handleSubmit(onSubmit)}>
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
              <Select
                {...register('theme', {
                  required: true,
                  onChange: onThemeChange,
                })}
                list={themes}
                keyName="id"
                valueName="name"
                defaultValue={defaultValues.theme}
                labelText="Тема сайта:"
                placeholder="Выберите тему"
                error={errors.theme}
              />
              <>
                {!isOAuth2User && (
                  <Button
                    text="Сменить пароль"
                    cls="mx-0 w-full"
                    view="secondary"
                    onClick={() => setShowChangePassword(true)}
                  />
                )}
              </>
              <div className="flex justify-between items-center mt-4">
                <Button
                  cls="mx-0"
                  text="Сохранить"
                  type="submit"
                  view="primary"
                />

                <Button
                  text="Выйти"
                  cls="mx-0"
                  onClick={onLogout}
                  view="error"
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
      </MainLayout>
    </>
  );
};

export default Profile;
