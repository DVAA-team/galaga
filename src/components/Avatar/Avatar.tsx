import './Avatar.css';
import { TProps } from './types';
import defaultAvatar from '../../assets/images/ico/avatar.svg';

const Avatar: TProps = ({ ...props }) => {
  const { borderType, className, style, ...rest } = props;

  const wrapperClassObject = () => {
    let cls = 'avatar';
    if (props.type === 'circle') {
      cls += ' avatar-circle';
    }
    if (borderType) {
      cls += ` avatar-border-${borderType}`;
    }
    if (props.size) {
      cls += ` avatar-${props.size}`;
    }
    return `${cls} ${className}`;
  };

  const renderBadge = () => {
    if (props.badge) {
      return (
        <div className={`avatar-badge ${borderType ? `avatar-badge-${borderType}` : ''}`}>
          <div style={{ transform: 'rotate(-45deg)' }}>{props.badge}</div>
        </div>
      );
    }
    return '';
  };

  return (
    <div className={wrapperClassObject()}>
      <img
        className={props.type === 'circle' ? 'avatar-circle' : ''}
        alt={props.alt}
        {...rest}
        style={style}
      />
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
