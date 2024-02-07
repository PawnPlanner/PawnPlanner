import express from "express";
import { 
    signInUp,
    signout,
    testauth,
} from "../controllers/auth";

import auth from "../middlewares/auth";

const router = express.Router();

router.post("/api/auth/google", signInUp);
router.get("/api/auth/signout", signout);
router.get("/api/testauth", auth, testauth);

export default router;