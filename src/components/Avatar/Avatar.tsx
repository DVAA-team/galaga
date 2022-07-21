import './Avatar.css';
import { TProps } from './types';
import defaultAvatar from '../../assets/images/ico/avatar.svg';

const Avatar: TProps = ({ ...props }) => {
  const { borderType, className, style, type, size, badge, alt, ...rest } = props;

  const wrapperClassObject = () => {
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
    return `${cls} ${className}`;
  };

  const renderBadge = () => {
    if (badge) {
      return (
        <div className={`avatar-badge ${borderType ? `avatar-badge-${borderType}` : ''}`}>
          <div style={{ transform: 'rotate(-45deg)' }}>{badge}</div>
        </div>
      );
    }
    return '';
  };

  return (
    <div className={wrapperClassObject()}>
      <img className={type === 'circle' ? 'avatar-circle' : ''} alt={alt} {...rest} style={style} />
      {renderBadge()}
    </div>
  );
};

Avatar.defaultProps = {
  alt: 'avatar',
  src: defaultAvatar.url,
  type: 'circle',
};

export default Avatar;
