import React from 'react';
import PropTypes from 'prop-types';

import parseUploadImage from '~/utils/parseUploadImage';

import { Container, AvatarPicture, Initials, InitialsText } from './styles';

const initials = (name) => {
  const fullNameArray = name.split(' ');
  const firstInitial = fullNameArray[0].split('')[0];
  const hasLastName = fullNameArray.length - 1 !== 0;
  if (hasLastName) {
    const lastInitial = fullNameArray[fullNameArray.length - 1].split('')[0];
    return firstInitial + lastInitial;
  }
  return firstInitial;
};

export default function ProfileAvatar({ profile, large }) {
  const { name, avatar } = profile;
  const avatarUrl = parseUploadImage(avatar);
  return (
    <Container>
      {avatar !== null ? (
        <AvatarPicture source={{ uri: avatarUrl }} large={large} />
      ) : (
        <Initials large={large}>
          <InitialsText large={large}>{initials(name)}</InitialsText>
        </Initials>
      )}
    </Container>
  );
}

ProfileAvatar.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.object,
  }),
};

ProfileAvatar.defaultProps = {
  large: false,
};
