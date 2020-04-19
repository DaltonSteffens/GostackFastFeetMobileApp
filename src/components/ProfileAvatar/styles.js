import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  display: flex;
`;

export const AvatarPicture = styled.Image.attrs({
  resizeMethod: 'resize',
})`
  width: 68px;
  height: 68px;
  border-radius: 34px;
  margin-right: 15px;
  background: #7d40e7;
  ${(props) =>
    props.large &&
    css`
      width: 136px;
      height: 136px;
      border-radius: 68px;
    `}
`;

export const Initials = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 68px;
  height: 68px;
  border-radius: 34px;
  margin-right: 15px;
  background-color: #f4effc;
  ${(props) =>
    props.large &&
    css`
      width: 136px;
      height: 136px;
      border-radius: 68px;
    `}
`;

export const InitialsText = styled.Text`
  font-size: 31px;
  color: #a28fd0;
  ${(props) =>
    props.large &&
    css`
      font-size: 52px;
    `}
`;
