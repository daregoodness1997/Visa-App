import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type LoginDataType = {
  email: string;
  password: string;
};
export type RegisterDataType = {
  name: string;
  email: string;
  password: string;
};
export type ForgotPasswordDataType = {
  email: string;
};
