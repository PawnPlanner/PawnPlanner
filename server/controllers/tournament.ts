import { Request, Response, NextFunction } from "express";

import {
    createtournament,
    saveTournament,
    fetchTournamentById,
} from "../services/tournament"

export const storeTournament = async( req: Request, res: Response) => {
    try{
        const tournament = await createtournament(req.body.tournament);
        await saveTournament(tournament);

        res.status(201);
        res.json({msg:"success"})
        console.log("here")
    } catch(error) {
        console.error(error);
        res.status(500);
        res.json({error: error});
    }
}

export const getTournamentById = async (req: Request, res:Response) => {
    try {
        const tournament = await fetchTournamentById(req.params.id);
        res.status(201);
        res.json({tournament: tournament});
    } catch (error) {
        res.status(500);
        res.json({error: error});
    }
}