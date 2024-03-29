import express from "express";

import {
    storeTournament,
    getTournamentById,
    getTournamentByName,
    additionalPlayer,
    deletePlayer,
    editTournament,
    removeTournament,
    getTournamentByUser,
    byeSignup,
    byeRemoval,
    storeMatch,
    storeRound,
    getRounds,
    getRoundById,
} from "../controllers/tournament"

import auth from "../middlewares/auth";

const router = express.Router();

router.post("/api/maketournament", storeTournament);
router.post("/api/tournament/addplayer", additionalPlayer);
router.post("/api/tournament/removeplayer", deletePlayer);
router.post("/api/tournament/bye", byeSignup);
router.post("/api/tournament/byeRemoval", byeRemoval);
router.post("/api/tournament/edit", editTournament);
router.post("/api/deleteTournament", removeTournament);
router.post("/api/tournament/newRound", storeRound);
router.post("/api/tournament/newMatch", storeMatch);

router.get("/api/tournament/:id", getTournamentById);
router.get("/api/tournament/fetchName/:name", getTournamentByName);
router.get("/api/myTournaments/:user", getTournamentByUser);
router.get("/api/rounds/:id", getRounds);
router.get("/api/round/:id", getRoundById);


export default router;