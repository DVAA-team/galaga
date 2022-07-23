import { object, ref, string } from 'yup';

const regLogin = /^[a-zA-Z][a-zA-Z0-9-_]*$/;
const regPassword =
  /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.])(?=.*[A-Z])(?=.*[a-z]).*$/;
const regEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,6}$/;
const regPhone = /^((8|\+7)[/\- ]?)?(\(?\d{3}\)?[/\- ]?)?[\d\- ]*$/;
const regName = /^[A-ZА-Я][a-zA-Zа-яА-Я-]*$/;

const errorText = {
  format: 'Неверный формат',
  min: 'Минимум символов:',
  max: 'Максимум символов:',
  required: 'Необходимо заполнить',
  password: 'Пароли не совпадают',
};

export const schemaSignIn = object({
  login: string()
    .required(errorText.required)
    .min(3, `${errorText.min} 3`)
    .max(20, `${errorText.max} 20`)
    .matches(regLogin, errorText.format),
  password: string()
    .required(errorText.required)
    .min(6, `${errorText.min} 6`)
    .max(40, `${errorText.max} 40`)
    .matches(regPassword, errorText.format),
});

export const schemaSignUp = object({
  login: string()
    .required(errorText.required)
    .min(3, `${errorText.min} 3`)
    .max(20, `${errorText.max} 20`)
    .matches(regLogin, errorText.format),
  password: string()
    .required(errorText.required)
    .min(6, `${errorText.min} 6`)
    .max(40, `${errorText.max} 40`)
    .matches(regPassword, errorText.format),
  passwordRepeat: string()
    .required(errorText.required)
    .oneOf([ref('password'), null], errorText.password),
  email: string()
    .required(errorText.required)
    .matches(regEmail, errorText.format),
  phone: string()
    .required(errorText.required)
    .min(10, `${errorText.min} 10`)
    .max(15, `${errorText.max} 15`)
    .matches(regPhone, errorText.format),
  secondName: string()
    .required(errorText.required)
    .matches(regName, errorText.format),
  firstName: string()
    .required(errorText.required)
    .matches(regName, errorText.format),
});

export const schemaProfile = object({
  login: string()
    .required(errorText.required)
    .min(3, `${errorText.min} 3`)
    .max(20, `${errorText.max} 20`)
    .matches(regLogin, errorText.format),
  email: string()
    .required(errorText.required)
    .matches(regEmail, errorText.format),
  phone: string()
    .required(errorText.required)
    .min(10, `${errorText.min} 10`)
    .max(15, `${errorText.max} 15`)
    .matches(regPhone, errorText.format),
  secondName: string()
    .required(errorText.required)
    .matches(regName, errorText.format),
  firstName: string()
    .required(errorText.required)
    .matches(regName, errorText.format),
  displayName: string()
    .required(errorText.required)
    .matches(regName, errorText.format),
});

export const schemaChangePassword = object({
  oldPassword: string()
    .required(errorText.required)
    .min(6, `${errorText.min} 6`)
    .max(40, `${errorText.max} 40`)
    .matches(regPassword, errorText.format),
  newPassword: string()
    .required(errorText.required)
    .min(6, `${errorText.min} 6`)
    .max(40, `${errorText.max} 40`)
    .matches(regPassword, errorText.format),
  newPasswordRepeat: string()
    .required(errorText.required)
    .oneOf([ref('newPassword'), null], errorText.password),
});
