// import packages
import { TokenPayload } from "google-auth-library";
import User, { IUser } from "../db/user";

import mongoose from "mongoose";

export const createUser = async (
  userData: TokenPayload,
  token: string
): Promise<mongoose.Document<unknown, any, IUser>> => {
  const user = new User({
    name: userData.name,
    username: "",
    givenName: userData.given_name,
    familyName: userData.family_name,
    email: userData.email,
    emailVerified: userData.email_verified,
    profileImgUrl: userData.picture,
    token: token,
    onboarded: false,
  });

  return user;
};

export const checkUser = async (email: string) => {
  try {
    const exist = await User.exists({ email: email });
    return exist;
  } catch (error) {
    throw error;
  }
};


export const updateUserToken = async (email: string, token: string) => {
  try {
    const user = await User.findOneAndUpdate(
      { email: email },
      { token: token },
      { new: true }
    );
    return user;
  } catch (error) {
    throw error;
  }
};

export const updateUserOnboarded = async (
  email: string,
  onboarded: boolean
) => {
  try {
    const user = await User.findOneAndUpdate(
      { email: email },
      { onboarded: onboarded },
      { new: true }
    );
    return user;
  } catch (error) {
    throw error;
  }
};


export const fetchUserById = async (
  id: string
): Promise<mongoose.Document<unknown, any, IUser>> => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw error;
  }
};

export const fetchUserByEmail = async (email: string) => {
  try {
    const user = await User.findOne({ email: email });
    return user;
  } catch (error) {
    throw error;
  }
};

export const saveUser = async (
  user: mongoose.Document<unknown, any, IUser>
) => {
  try {
    const savedUser = await user.save();
    return savedUser;
  } catch (error) {
    throw error;
  }
};

export const fetchUserbyUserName = async (username: string) => {
  try {
    const users = await User.findOne({ username: username });
    return users;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchUsersbyUserName = async (username: string) => {
  var regexp = new RegExp("^" + username);

  try {
    const users = await User.find({ username: regexp });
    return users;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateNames = async (
  email: string,
  username: string,
  givenName: string,
  middleName: string,
  familyName: string
) => {
  try {
    await User.findOneAndUpdate({ email: email }, { username: username });
    await User.findOneAndUpdate({ email: email }, { givenName: givenName });
    await User.findOneAndUpdate({ email: email }, { middleName: middleName });
    await User.findOneAndUpdate({ email: email }, { familyName: familyName });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteAccount = async (username: string) => {
  try{
    await User.deleteOne({email: username});
  } catch(error) {
    console.error(error);
    throw error;
  }
};