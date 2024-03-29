import mongoose from "mongoose";

// import packages
import { TokenPayload } from "google-auth-library";
import User, { IUser } from "../db/user";
import Tournament, { ITournament } from "../db/tournament";
import Player, { IPlayer } from "../db/player";
import { TPlayer } from "../types/player";
import { TTournament } from "../types/tournament";
import { TRound } from "../types/round";
import Round, { IRound } from "../db/round";
import { TMatch } from "../types/match";
import Match from "../db/match";
import { IMatch } from "../db/match";
import { match } from "assert";
import { fetchTournamentById } from "./tournament";

export const createRound = async (
    newRound: TRound
) : Promise<mongoose.Document<unknown, any, IRound>> => {
    const round = new Round({
        tournament: newRound.tournament,
        number: newRound.number,
    })
    return round;
};

export const saveRound = async (
    round: mongoose.Document<unknown, any, IRound>
) => {
    try {
      const savedRound = await round.save();
      return savedRound;
    } catch (error) {
        throw error;
    }
};

export const createMatch = async (
    newMatch: TMatch
) : Promise<mongoose.Document<unknown, any, IMatch>> => {
    const match = new Match({
      player1: newMatch.player1,
      player2: newMatch.player2,
    })
    return match;
};

export const saveMatch = async (
    match:  mongoose.Document<unknown, any, IMatch>
) => {
    try {
      const savedMatch = await match.save();
      return savedMatch;
    } catch (error) {
        throw error;
    }
};

export const updateResult = async (
    match: TMatch
) => {
    try{
        await Match.findOneAndUpdate(match, {
            result: match.result,
        });
    } catch (error) {
        throw error;
    }
}

export const addMatch = async (
    match:  mongoose.Document<unknown, any, IMatch>,
    round:  mongoose.Document<unknown, any, IRound>,
) => {
    await Round.findOneAndUpdate({round}, {$push: {matches: match}});
}

export const fetchRounds = async (
    id: string
) => {
    try {
        const tournament = await fetchTournamentById(id);
        console.log(tournament.name);
        const rounds = await Round.find({Tournament}, {id});
        console.log(tournament.name);
        return rounds;
    } catch (error) {
        throw error;
    }
}

export const fetchRoundById = async (id: string) => {
    try {
      const round = await Round.findOne({ _id: id });
      return round;
    } catch (error) {
      throw error;
    }
  }