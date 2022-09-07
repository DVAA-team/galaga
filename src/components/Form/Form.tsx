import { FC, FormEvent } from 'react';

type TOwnProps = {
  title?: string;
  handlerSubmit: (e: FormEvent<HTMLFormElement>) => void;
  children?: JSX.Element | JSX.Element[];
  cls?: string;
};

type TProps = FC<TOwnProps>;

const Form: TProps = (props) => {
  const { handlerSubmit, title = '', cls = '', children } = props;

  return (
    <div className="form_wrapper w-full max-w-md rounded-md border px-8 pt-10 pb-10 backdrop-blur-sm">
      {title && (
        <h1 className="form__title mb-7 text-3xl text-center font-bold dark:text-white">
          {title}
        </h1>
      )}
      <form className={`form ${cls}`} onSubmit={handlerSubmit}>
        {children}
      </form>
    </div>
  );
};

export default Form;
