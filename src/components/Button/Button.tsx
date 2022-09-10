import { ButtonHTMLAttributes, FC } from 'react';

type TOwnProps = {
  text?: string;
  type?: string;
  cls?: string;
  view?: 'primary' | 'secondary' | 'error';
  onClick?: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type TProps = FC<TOwnProps>;

const Button: TProps = (props) => {
  const { text, type = 'button', cls = '', view, onClick } = props;

  const getClassName = (additionClasses?: string) => {
    const baseClasses = [
      'button relative font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline block mx-auto hover:brightness-90 dark:hover:brightness-110',
    ];

    switch (view) {
      case 'primary':
        baseClasses.push('bg-primary text-white');
        break;
      case 'secondary':
        baseClasses.push('bg-secondary text-black dark:hover:brightness-90');
        break;
      case 'error':
        baseClasses.push('bg-error text-white ');
        break;
      default:
        baseClasses.push('bg-slate-300 dark:bg-slate-700 dark:text-white');
        break;
    }

    if (additionClasses) {
      baseClasses.push(additionClasses);
    }

    return baseClasses.join(' ');
  };

  return (
    <button className={getClassName(cls)} type={type} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
