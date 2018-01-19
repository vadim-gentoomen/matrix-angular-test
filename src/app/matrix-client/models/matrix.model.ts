export enum AuthenticationTypes {
  Password = 'm.login.password',
  Recaptcha = 'm.login.recaptcha',
  Oauth2 = 'm.login.oauth2',
  EmailIdentity = 'm.login.email.identity',
  Token = 'm.login.token',
  Dummy = 'm.login.dummy'
}

export interface LoginData {
  homeserverUrl: string;
  identityServerUrl: string;
  userId: string;
  deviceId: string;
  accessToken: string;
}
