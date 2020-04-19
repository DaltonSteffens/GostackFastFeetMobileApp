import React, { useCallback } from 'react';
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { logOut } from '~/store/modules/auth/actions';

import ProfileAvatar from '~/components/ProfileAvatar';
import { SubmitButton, SubmitButtonText } from '~/components/Layout';

import { statusbarUpdateColor } from '~/store/modules/statusbar/actions';

import {
  Container,
  ProfileInfoContainer,
  ProfileAvatarContainer,
  ProfileTextSmall,
  ProfileTextLarge,
} from './styles';

export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.profile);

  useFocusEffect(
    useCallback(() => {
      dispatch(statusbarUpdateColor('#fff'));
    }, [])
  );
  return (
    <Container>
      {user !== null && (
        <>
          <ProfileAvatarContainer>
            <ProfileAvatar large profile={user} />
          </ProfileAvatarContainer>
          <ProfileInfoContainer>
            <ProfileTextSmall>Full name</ProfileTextSmall>
            <ProfileTextLarge>{user.name}</ProfileTextLarge>
            <ProfileTextSmall>Email</ProfileTextSmall>
            <ProfileTextLarge>{user.email}</ProfileTextLarge>
            <ProfileTextSmall>Created on</ProfileTextSmall>
            <ProfileTextLarge>
              {format(new Date(user.created_at), 'MM/dd/yyyy')}
            </ProfileTextLarge>
          </ProfileInfoContainer>
        </>
      )}
      <SubmitButton onPress={() => dispatch(logOut())} color="#E74040">
        <SubmitButtonText>Logout</SubmitButtonText>
      </SubmitButton>
    </Container>
  );
}
