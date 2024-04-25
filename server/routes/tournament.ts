import express from "express";

import {
    storeTournament,
    getTournamentById,
    getTournamentByRoundId,
    getTournamentByName,
    additionalPlayer,
    deletePlayer,
    editTournament,
    removeTournament,
    getTournamentByUser,
    byeSignup,
    byeRemoval,
    storeMatch,
    deleteAllMatches,
    storeRound,
    getRounds,
    getRoundById,
    updateMatch,
    getRoundNumber,
    addPoints,
    getTournamentsByName,
    getPlayerById,
    addHalfPoint,
    getMatchesByPlayer,
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
router.post("/api/tournament/deleteMatches", deleteAllMatches);
router.post("/api/tournament/updateMatchResult", updateMatch);
router.post("/api/tournament/addPoints", addPoints);
router.post("/api/tournament/addHalfPoint", addHalfPoint);
router.post("/api/tournament/queryTournament", auth, getTournamentsByName);

router.get("/api/tournament/:id", getTournamentById);
router.get("/api/tournament/round/:id", getTournamentByRoundId);
router.get("/api/tournament/fetchName/:name", getTournamentByName);
router.get("/api/myTournaments/:user", getTournamentByUser);
router.get("/api/rounds/:id", getRounds);
router.get("/api/round/:id", getRoundById);
router.get("/api/tournament/:id/:number", getRoundNumber);
router.get("/api/player/:id", getPlayerById);
router.get("/api/player/matches/:id", getMatchesByPlayer);



export default router;