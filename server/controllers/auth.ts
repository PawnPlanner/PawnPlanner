import { Request, Response, NextFunction } from "express";

// import services
import { validateToken } from "../services/google-login";

import {
  createUser,
  saveUser,
  checkUser,
  updateUserToken,
  fetchUserByEmail,
} from "../services/user";

export const signInUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.body;
  let existingAccount = true;
  try {
    const userData = await validateToken(token);
    const exist = await checkUser(userData.email);
    if (exist) {
      // exist == document with _id
      await updateUserToken(userData.email, token);
      const user = await fetchUserByEmail(userData.email);
      req.session.user = user;
    } else {
      // exist == null
      const user = await createUser(userData, token);
      existingAccount = false;
      await saveUser(user);
    }

    req.session.user = {
      username: userData.name,
      givenName: userData.given_name,
      familyName: userData.family_name,
      email: userData.email,
      emailVerified: userData.email_verified,
      profileImgUrl: userData.picture,
      token: token,
      onboarded: false,
    };

    res.status(201);
    res.json({ user: req.session.user, existingAccount: existingAccount });
  } catch (error) {
    console.error(error);
    res.status(500);
    res.json({ error: error });
  }
};

export const testauth = (req: Request, res: Response) => {
  res.send("welcome. you are logged in");
};

export const signout = async (req: Request, res: Response) => {
  await req.session.destroy((error) => {
    if (error) {
      res.status(500);
      res.json({ msg: "signout fail" });
    } else {
      res.status(200);
      res.json({ msg: "signout success" });
    }
  });
};