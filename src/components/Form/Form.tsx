import { FC, FormEvent } from 'react';

type OwnProps = {
  title?: string;
  handlerSubmit: (e: FormEvent<HTMLFormElement>) => void;
  children?: JSX.Element | JSX.Element[];
  cls?: string;
};

type Props = FC<OwnProps>;

const Form: Props = (props) => {
  const { handlerSubmit, title = '', cls = '', children } = props;
  return (
    <div className="form_wrapper w-full max-w-md rounded-md border border-white px-8 pt-10 pb-10">
      {title && (
        <h1 className="form__title mb-7 text-3xl text-center font-bold">
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
