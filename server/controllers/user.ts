import { Request, Response, NextFunction } from "express";
import {
  fetchUserByEmail,
  fetchUserbyUserName,
  fetchUsersbyUserName,
  updateNames,
  updateUserOnboarded,
  deleteAccount,
} from "../services/user";

import fs from "fs";

export const sessionUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await fetchUserByEmail(req.session.user.email);
    res.status(200);
    res.json({ user: user });
  } catch (error) {
    res.status(404);
    res.json({ msg: "cannot find user" });
  }
};

export const findUsersByUserName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await fetchUsersbyUserName(req.body.username);
    res.status(200);
    res.json({ users: users });
  } catch (error) {
    res.status(404);
    res.json({ msg: "cannot find user" });
  }
};

export const getUserByUsername = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await fetchUserbyUserName(req.params.username);
    res.status(200);
    res.json({ user: user });
  } catch (error) {
    res.status(404);
    res.json({ msg: "cannot find user" });
  }
};


export const changeNames = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email = req.session.user.email;
  try {
    await updateNames(
      email,
      req.body.username,
      req.body.givenName,
      req.body.middleName,
      req.body.familyName
    );

    req.session.user.username = req.body.username;
    req.session.user.givenName = req.body.givenName;
    req.session.user.familyName = req.body.familyName;

    res.status(200);
    res.json({ msg: "success" });
  } catch (error) {
    res.status(404);
    res.json({ msg: "cannot find user" });
  }
};

export const changeOnboarded = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = req.session.user.email;
    await updateUserOnboarded(email, req.body.onboarded).then(() => {
      res.status(200);
      res.json({ msg: "success" });
    });
  } catch (error) {
    res.status(404);
    res.json({ msg: "update onboard fail" });
  }
};

export const deleteUserAccount= async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const username = req.session.user.email;

  try{
    await req.session.destroy(async (error) => {
      if(error) {
        res.status(500);
        res.json({msg: "failed to delete"});
      } else {
        await deleteAccount(username);
        res.status(200)
        res.json({msg: "deletion successful"});
      }
    });
  } catch (error) {
    res.status(404);
    res.json({msg:"Cannot fins user to delete"});
  }
};








