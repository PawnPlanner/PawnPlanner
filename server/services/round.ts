import mongoose, { ObjectId } from "mongoose";

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
import { assert } from "console";


export const createRound = async (
    newRound: TRound,
    ID: string,
): Promise<mongoose.Document<unknown, any, IRound>> => {
    const round = new Round({

        number: newRound.number,
    })
    let tourn = await Tournament.findOne({ _id: ID }, "roundsArray");
    let rounds = tourn.roundsArray;
    rounds.push(round._id.toString());
    await Tournament.findByIdAndUpdate(ID, { roundsArray: rounds });

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
): Promise<mongoose.Document<unknown, any, IMatch>> => {
    const match = new Match({
        player1: newMatch.player1,
        player2: newMatch.player2,
        result: ""
    })
    await Player.findOneAndUpdate({_id:newMatch.player1._id},{$addToSet: {matches:match}} );
    await Player.findOneAndUpdate({_id:newMatch.player2._id},{$addToSet: {matches:match}} );
    return match;
};

export const addMatch = async (
    match: mongoose.Document<unknown, any, IMatch>, id: string) => {
    try {
        await Round.findOneAndUpdate({ _id: id }, { $addToSet: { matches: match } });
       
        
    } catch (error) {
        throw error
    }
}

export const deleteMatches = async (
    id: string) => {
    try {
        await Round.findOneAndUpdate({ _id: id }, { $set: { matches: [] } });
    } catch (error) {
        throw error
    }
}

export const saveMatch = async (
    match: mongoose.Document<unknown, any, IMatch>
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
    try {
        await Match.findOneAndUpdate(match, {
            result: match.result,
        });
    } catch (error) {
        throw error;
    }
}

export const fetchRounds = async (
    id: string
) => {
    try {
        const tournament = await fetchTournamentById(id);
        const rounds = tournament.roundsArray;
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

export const updateMatchResult = async (
    match: TMatch, result: string, id: string) => {
    try {
        let res;
        if(result == '0') {
            res = match.player2.name + ' won'
            await Player.findOneAndUpdate({_id: match.player2}, {$inc:{points: 1} });
        } else if (result == '0.5') {
            res = 'Draw'
            await Player.findOneAndUpdate({_id: match.player2}, {$inc:{points: 0.5} });
            await Player.findOneAndUpdate({_id: match.player1}, {$inc:{points: 0.5} });
        } else if(result == '1') {
            res = match.player1.name + ' won'
            await Player.findOneAndUpdate({_id: match.player1}, {$inc:{points: 1} });
        } else {
            res = 'Bye'
        }
        await Match.findOneAndUpdate({_id: match._id}, {result: res});
        await Player.updateOne({_id: match.player1._id, "matches.player1": match.player1}, {$set:{"matches.$.result": res}});
        await Player.updateOne({_id: match.player2._id, "matches.player1": match.player1}, {$set:{"matches.$.result": res}});
        // update tournament players docs to match player docs
    } catch (error) {
        throw error
    }
}


export const fetchRoundNumber = async (
    tournament: string, number: number
) => {
    try {
        const tourn = await Tournament.findOne({
            _id: tournament
        })
        const round = await fetchRoundById(tourn.roundsArray[number - 1].toString()) ;
        return round;
    }
    catch(error) {
     throw error
    }
}

export const fetchMatchesByPlayer = async(id: string) => {
    try {
        const matches = await Player.findOne({_id: id});
        return matches.matches;
    } catch(error) {
        throw error;
    }
}