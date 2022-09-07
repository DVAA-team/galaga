import { FC, ForwardedRef, forwardRef, SelectHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

import styles from './Select.module.css';

type TOwnSelectProps = {
  name: string;
  list: string[];
  id?: string;
  defaultValue?: string;
  labelText?: string;
  error?: FieldError;
  placeholder?: string;
  ref?: ForwardedRef<HTMLSelectElement>;
};

type TSelectProps = FC<
  TOwnSelectProps & SelectHTMLAttributes<HTMLSelectElement>
>;

const Select: TSelectProps = forwardRef((props, ref) => {
  const {
    id,
    name,
    labelText,
    list,
    placeholder,
    defaultValue,
    error,
    ...other
  } = props;
  return (
    <div className="mb-6 relative">
      <label className="mb-3 xl:w-96">
        {labelText && (
          <span className="block mb-1 dark:text-white">{labelText}</span>
        )}
        <select
          {...other}
          id={id}
          name={name}
          ref={ref}
          className={styles.select}
          defaultValue={defaultValue}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {list.map((value, idx) => (
            <option key={idx} value={value}>
              {value}
            </option>
          ))}
        </select>
        {error && (
          <div className="form__error absolute top-full text-red-500 text-xs">
            {error.message}
          </div>
        )}
      </label>
    </div>
  );
});

export default Select;
