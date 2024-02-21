import express from "express";
import {
  sessionUpdate,
  changeNames,
  getUserByUsername,
  changeOnboarded,
  findUsersByUserName,
  deleteUserAccount,
} from "../controllers/user";

// import middleware
import auth from "../middlewares/auth";

const router = express.Router();

router.get("/user", auth, sessionUpdate);


router.get("/api/user/:username", auth, getUserByUsername);

router.post("/api/user/onboard", auth, changeOnboarded);
router.post("/api/user/adjustNames", auth, changeNames);
router.post("/api/user/queryUsernames", auth, findUsersByUserName);
router.post("/api/user/queryUsername", auth, findUsersByUserName);
router.post("/api/user/deleteAccount", auth, deleteUserAccount);


export default router;