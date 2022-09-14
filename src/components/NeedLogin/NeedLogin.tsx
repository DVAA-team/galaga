import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

type TOwnProps = {
  text: string;
};

type TProps = FC<TOwnProps>;

const NeedLogin: TProps = ({ text }) => {
  const location = useLocation();

  return (
    <div>
      {text}, нужно{' '}
      <Link
        to="/sign-in"
        className="underline hover:no-underline"
        state={{ from: location }}
      >
        авторизоваться
      </Link>
    </div>
  );
};

export default NeedLogin;
