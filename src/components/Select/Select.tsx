import { FC, ForwardedRef, forwardRef, SelectHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

import styles from './Select.module.css';

type TOwnSelectProps = {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  list: any[];
  id?: string;
  keyName: string;
  valueName: string;
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
    error,
    keyName,
    valueName,
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
        >
          {placeholder && (
            <option value={other.defaultValue} disabled>
              {placeholder}
            </option>
          )}
          {list.map((value) => (
            <option key={value[keyName]} value={value[keyName]}>
              {value[valueName]}
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
