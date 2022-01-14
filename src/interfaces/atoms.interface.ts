import { AvatarProps, ButtonProps, ListProps, TextFieldProps, TypographyProps } from '@mui/material';

export interface buttonInterface extends ButtonProps {
  content: string | JSX.Element;
}

export type inputInterface = TextFieldProps;

export interface printInterface extends TypographyProps {
  text: string;
}

export type listInterface = ListProps;

export type avatarInterface = AvatarProps;