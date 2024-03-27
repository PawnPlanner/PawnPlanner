import express from "express";

import {
    storeTournament,
    getTournamentById
} from "../controllers/tournament"

import auth from "../middlewares/auth";
const router = express.Router();

router.post("/api/maketournament", storeTournament);

router.get("/api/tournament/:id", getTournamentById);

export default router;