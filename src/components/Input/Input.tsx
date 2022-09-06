import { FC, ForwardedRef, forwardRef, InputHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

type TOwnProps = {
  type?: string;
  value?: string;
  id?: string;
  name: string;
  cls?: string;
  placeholder?: string;
  withoutMargin?: boolean;
  withLabel?: boolean;
  labelText?: string;
  required?: boolean;
  error?: FieldError;
  ref?: ForwardedRef<HTMLInputElement>;
} & InputHTMLAttributes<HTMLInputElement>;

type TProps = FC<TOwnProps>;

const Input: TProps = forwardRef((props, ref) => {
  const {
    cls = '',
    type = 'text',
    placeholder = '',
    id,
    name,
    withoutMargin = false,
    withLabel = false,
    labelText = placeholder,
    required,
    error,
    ...other
  } = props;

  const inputDefault = () => (
    <input
      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${cls}`}
      id={id}
      name={name}
      type={type}
      required={required}
      placeholder={placeholder}
      {...other}
      ref={ref}
    />
  );

  const inputWithLabel = () => (
    <label className="form__label">
      <span className="block mb-1">{labelText}</span>
      <input
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${cls}`}
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        {...other}
        ref={ref}
      />
    </label>
  );

  return (
    <div className={`form__field relative ${withoutMargin ? '' : 'mb-6'}`}>
      {withLabel ? inputWithLabel() : inputDefault()}
      {error && (
        <div className="form__error absolute top-full text-red-500 text-xs">
          {error.message}
        </div>
      )}
    </div>
  );
});

export default Input;
