export enum AuthenticationTypes {
  Password = 'm.login.password',
  Recaptcha = 'm.login.recaptcha',
  Oauth2 = 'm.login.oauth2',
  EmailIdentity = 'm.login.email.identity',
  Token = 'm.login.token',
  Dummy = 'm.login.dummy'
}

export interface LoginSubmitObject {
  type: AuthenticationTypes;
  user?: string;
  password?: string;
  session?: string;
  medium?: string;
  address?: string;
  response?: string;
  token?: string;
  txn_id?: string;
  threepidCreds?: any[];
}

export interface LoginData {
  homeServerUrl: string;
  identityServerUrl: string;
  userId: string;
  deviceId: string;
  accessToken: string;
}
