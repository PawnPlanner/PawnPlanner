import express from "express";

import {
    storeTournament,
    getTournamentById,
    getTournamentByName,
    additionalPlayer,
    deletePlayer,
    editTournament,
} from "../controllers/tournament"

import auth from "../middlewares/auth";

const router = express.Router();

router.post("/api/maketournament", storeTournament);
router.post("/api/tournament/addplayer", additionalPlayer);
router.post("/api/tournament/removeplayer", deletePlayer);
router.post("/api/tournament/edit", editTournament);

router.get("/api/tournament/:id", getTournamentById);
router.get("/api/tournament/fetchName/:name", getTournamentByName);

export default router;