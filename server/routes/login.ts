import express from "express";
import { signInUp, signout } from "../controllers/login";


const router = express.Router();

router.post("/api/auth/google", signInUp);
router.get("/api/auth/signout", signout);

export default router;