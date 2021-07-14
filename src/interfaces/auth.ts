export type ITokenPayload = {
  id: number;
};

export interface IRegisterProps {
  accountId: string;
  password: string;
  name: string;
}

export interface ILoginProps {
  accountId: string;
  password: string;
}
