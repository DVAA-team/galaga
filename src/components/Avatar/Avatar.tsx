import defaultAvatar from '../../assets/images/ico/avatar.svg';
import './Avatar.css';
import { TProps } from './types';

const Avatar: TProps = ({ ...props }) => {
  const {
    src = defaultAvatar.url,
    alt = 'avatar',
    type = 'circle',
    borderType,
    className,
    style,
    size,
    badge,
    ...rest
  } = props;

  const getWrapperClasses = () => {
    let cls = 'avatar';
    if (type === 'circle') {
      cls += ' avatar-circle';
    }
    if (borderType) {
      cls += ` avatar-border-${borderType}`;
    }
    if (size) {
      cls += ` avatar-${size}`;
    }
    return `${cls} ${className ?? ''}`;
  };

  const badgeTemplate = (
    <div
      className={`avatar-badge ${
        borderType ? `avatar-badge-${borderType}` : ''
      }`}
    >
      <div style={{ transform: 'rotate(-45deg)' }}>{badge}</div>
    </div>
  );

  return (
    <div className={getWrapperClasses()}>
      <img
        src={src}
        className={type === 'circle' ? 'avatar-circle' : ''}
        alt={alt}
        {...rest}
        style={style}
      />
      {badge && badgeTemplate}
    </div>
  );
};

export default Avatar;
