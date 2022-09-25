import { ReactEventHandler } from 'react';
import defaultAvatar from '../../assets/images/ico/avatar.svg';
import './Avatar.css';
import { TProps } from './types';

const Avatar: TProps = ({ ...props }) => {
  const {
    src = defaultAvatar,
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

  const onError: ReactEventHandler<HTMLImageElement> = (event) => {
    event.currentTarget.src = defaultAvatar;
  };

  return (
    <div className={getWrapperClasses()}>
      <img src={src} alt={alt} style={style} onError={onError} {...rest} />
      {badge && badgeTemplate}
    </div>
  );
};

export default Avatar;
