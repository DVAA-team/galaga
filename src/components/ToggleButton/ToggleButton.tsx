import { FC, ForwardedRef, forwardRef, InputHTMLAttributes } from 'react';
import styles from './ToggleButton.module.css';

type TOwnToggleButtonProps = {
  name: string;
  id?: string;
  cls?: string;
  labelText?: string;
  ref?: ForwardedRef<HTMLInputElement>;
} & InputHTMLAttributes<HTMLInputElement>;

type TToggleButtonProps = FC<TOwnToggleButtonProps>;

const ToggleButton: TToggleButtonProps = forwardRef((props, ref) => {
  const { id, name, cls, labelText, ...other } = props;

  return (
    <div className={`${styles['tb-wrapper']}${cls ? ` ${cls}` : ''}`}>
      <label className={styles['tb-label']}>
        {labelText}
        <input
          {...other}
          className={styles['tb-input']}
          id={id}
          name={name}
          type="checkbox"
          ref={ref}
        />
        <div className={styles['tb-toggler']}>
          <div className={styles['tb-toggler__content']}>
            <span className={styles['check-icon']}>🌜</span>
            <span className={styles.circle}></span>
            <span className={styles['uncheck-icon']}>🌞</span>
          </div>
        </div>
      </label>
    </div>
  );
});

export default ToggleButton;
