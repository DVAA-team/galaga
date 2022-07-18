import { ButtonHTMLAttributes, FC } from 'react';

type TOwnProps = {
  text?: string;
  type?: string;
  cls?: string;
  onClick?: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type TProps = FC<TOwnProps>;

const Button: TProps = (props) => {
  const { text, type = 'button', cls = '', onClick } = props;

  return (
    <button
      className={`button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline block mx-auto ${cls}`}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
