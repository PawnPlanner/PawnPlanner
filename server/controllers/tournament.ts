import { Request, Response, NextFunction } from "express";

import {
    createtournament,
    saveTournament,
    fetchTournamentById,
    fetchTournamentByName,
    addPlayer,
    createPlayer,
    removePlayer,
    updateTournament,
    deleteTournament,
    fetchTournamentByUser,
    byeRequest,
    removeBye,
    fetchTournamentByRoundId,
    additionalPoints,
    fetchTournnamentsbyName,
} from "../services/tournament"

import {
    createRound,
    saveRound,
    createMatch,
    saveMatch,
    updateResult,
    addMatch,
    fetchRounds,
    fetchRoundById,
    deleteMatches,
    updateMatchResult,
    fetchRoundNumber
} from "../services/round"

import { error } from "console";

export const storeTournament = async (req: Request, res: Response) => {
    try {
        const tournament = await createtournament(req.body.tournament);
        await saveTournament(tournament);

        res.status(201);
        res.json({ msg: "success" })
    } catch (error) {
        console.error(error);
        res.status(500);
        res.json({ error: error });
    }
}

export const getTournamentById = async (req: Request, res: Response) => {
    try {
        const tournament = await fetchTournamentById(req.params.id);
        res.status(201);
        res.json({ tournament: tournament });
    } catch (error) {
        res.status(500);
        res.json({ error: error });
    }
}

export const getTournamentByRoundId = async (req: Request, res: Response) => {
    try {
        const tournament = await fetchTournamentByRoundId(req.params.id);
        res.status(201);
        res.json({ tournament: tournament });
    } catch (error) {
        res.status(500);
        res.json({ error: error });
    }
}

export const getTournamentByName = async (req: Request, res: Response) => {
    try {
        const tournament = await fetchTournamentByName(req.params.name);
        res.status(201);
        res.json({ tournament: tournament });

    } catch (error) {
        res.status(500);
        res.json({ error: error });
    }
}

export const additionalPlayer = async (req: Request, res: Response) => {
    try {
        const player = await createPlayer(req.body.player);
        await addPlayer(player, req.body.id);
        res.status(201);
        res.json({ msg: "success" });
    } catch {
        res.status(500);
        res.json({ error: error });
    }
}

export const deletePlayer = async (req: Request, res: Response) => {
    try {
        await removePlayer(req.body.player, req.body.id);
        res.status(201);
        res.json({ error: error });
    } catch {
        res.status(500);
        res.json({ msg: "success" });
    }
}

export const editTournament = async (req: Request, res: Response) => {
    try {
        
        await updateTournament(req.body.tournament);
        res.status(201);
        res.json({ msg: "success" })
    } catch {
        res.status(500);
        res.json({ error: error });
    }
}

export const removeTournament = async (req: Request, res: Response) => {
    try {
        await deleteTournament(req.body.tournament);
        res.status(201);
        res.json({msg: "success" });
    }
    catch {
        res.status(500);
        res.json({error:error});
    }
}

export const getTournamentByUser = async (req:Request, res: Response) => {
    try {
        const tournaments = await fetchTournamentByUser(req.params.user);
        res.status(201);
        res.json({tournaments: tournaments});
    }
    catch(error) {
        res.status(5005);
        res.json({error: error});
    }
}

export const storeRound = async (req: Request, res: Response) => {
    try {
        const round = await createRound(req.body.round, req.body.Id);
        await saveRound(round);

        res.status(201);
        res.json({ msg: "success" })
    } catch (error) {
        console.error(error);
        res.status(500);
        res.json({ error: error });
    }
}

export const storeMatch = async (req: Request, res: Response) => {
    try {
        const match = await createMatch(req.body.match);
        await addMatch(match, req.body.id);

        res.status(201);
        res.json({ msg: "success" })
    } catch (error) {
        console.error(error);
        res.status(500);
        res.json({ error: error });
    }
}

export const deleteAllMatches = async (req: Request, res: Response) => {
    try {
        await deleteMatches(req.body.id);
        res.status(201);
        res.json({ msg: "success" })
    } catch (error) {
        console.error(error);
        res.status(500);
        res.json({ error: error });
    }
}

export const editResult = async (req: Request, res: Response) => {
    try {
        
        await updateResult(req.body.match);
        res.status(201);
        res.json({ msg: "success" })
    } catch {
        res.status(500);
        res.json({ error: error });
    }
}

export const byeSignup = async (req: Request, res: Response) => {
    try {
        
        await byeRequest(req.body.player, req.body.id);
        res.status(201);
        res.json({ msg: "success" })
    } catch {
        res.status(500);
        res.json({ error: error });
    }
}

export const byeRemoval = async (req: Request, res: Response) => {
    try {
        
        await removeBye(req.body.player, req.body.id);
        res.status(201);
        res.json({ msg: "success" })
    } catch {
        res.status(500);
        res.json({ error: error });
    }
}

export const getRounds = async (req: Request, res: Response) => {
    try {
        
        const rounds = await fetchRounds(req.params.id);
        res.status(201);
        res.json({ rounds: rounds });
    }
    catch{
        res.status(500);
        res.json({error: error})
    }
}

export const getRoundById = async (req: Request, res: Response) => {
    try {
        const round = await fetchRoundById(req.params.id);
        res.status(201);
        res.json({ round: round });
    } catch (error) {
        res.status(500);
        res.json({ error: error });
    }
}

export const updateMatch = async (req: Request, res: Response) => {
    try {
        
        await updateMatchResult(req.body.match, req.body.result, req.body.id);
        res.status(201);
        res.json({ msg: "success" })
    } catch {
        res.status(500);
        res.json({ error: error });
    }
}

export const getRoundNumber = async (req: Request, res:Response) => {
    try {
        const round = await fetchRoundNumber(req.params.id, parseInt(req.params.number))
        res.status(201);
        res.json({round: round});
    } catch {
        res.status(5005);
        res.json({error: error});
    }
}

export const addPoints = async (req: Request, res: Response) => {
    try {
        await additionalPoints(req.body.player, req.body.number, req.body.id);
        res.status(201);
        res.json({ msg: "success" });
    } catch {
        res.status(500);
        res.json({ error: error });
    }
}

export const getTournamentsByName = async(
    req: Request, 
    res:Response,
    next: NextFunction) => {
    try{
        const tournaments = await fetchTournnamentsbyName(req.body.tournament);
        res.status(200);
        res.json({tournaments: tournaments});
    } catch(error) {
        res.json(404);
        res.json({msg: "cannot find tounrmanet"})
    }
}