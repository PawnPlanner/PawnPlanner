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
} from "../services/tournament"
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
        res.json({ error: error });
    } catch {
        res.status(500);
        res.json({ error: error });
    }
}

export const deletePlayer = async (req: Request, res: Response) => {
    try {
        await removePlayer(req.body.player);
        res.status(201);
        res.json({ error: error });
    } catch {
        res.status(500);
        res.json({ error: error });
    }
}

export const editTournament = async (req: Request, res: Response) => {
    try {
        await updateTournament(req.body.tournament);
        res.status(201);
        res.json({ error: error })
    } catch {
        res.status(500);
        res.json({ error: error });
    }
}

export const removeTournament = async (req: Request, res: Response) => {
    try {
        await deleteTournament(req.body.tournament);
        res.status(201);
        res.json({error: error});
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