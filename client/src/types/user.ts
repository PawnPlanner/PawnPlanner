export type TUser = {
  _id?: string;
  name: string;
  username: string;
  givenName: string;
  middleName: string;
  familyName: string;
  email: string;
  emailVerified: Boolean;
  profileImgUrl: string;
  backgroundImgUrl: string;
  token: string;
  onboarded: Boolean;
};

export type TUserWrapper = {
  user: TUser;
  existingAccount: boolean;
};