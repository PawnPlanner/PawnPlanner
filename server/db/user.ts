import mongoose, { Schema } from "mongoose";

export interface IUser {
  username: string;
  givenName: string;
  familyName: string;
  email: string;
  emailVerified: Boolean;
  profileImgUrl: string;
  token: string;
  onboarded: Boolean;
}

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: false,
    },
    givenName: {
      type: String,
      required: true,
    },
    familyName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    emailVerified: {
      type: Boolean,
      required: true,
    },
    profileImgUrl: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    onboarded: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>("User", UserSchema);
export default User;