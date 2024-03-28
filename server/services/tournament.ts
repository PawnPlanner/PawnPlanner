import mongoose from "mongoose";

// import packages
import { TokenPayload } from "google-auth-library";
import User, { IUser } from "../db/user";
import Tournament, {ITournament} from "../db/tournament";
import Player, {IPlayer } from "../db/player";


export const createtournament = async (
    newTournament: ITournament
): Promise<mongoose.Document<unknown, any, ITournament>> => {
  const tournament = new Tournament({
    name: newTournament.name,
    rounds: newTournament.rounds,
    location: newTournament.location,
    pairingSystem: newTournament.pairingSystem,
    date: newTournament.date,
  });

  return tournament;
};

export const saveTournament = async (
  tournament: mongoose.Document<unknown, any, ITournament>
) => {
  try{
    const savedTournament = await tournament.save();
   
    return saveTournament;
  } catch(error) {
    throw error;
  }
};

export const fetchTournamentById = async (id: string) => {
  try {
    const tournament = await Tournament.findOne({_id: id});
    return tournament;
  } catch(error) {
    throw error;
  }
}

export const fetchTournamentByName = async (name: string) => {
  try {
    const tournament = await Tournament.findOne({name: name});
    return tournament;
  } catch(error) {
    throw error;
  }
}

export const addPlayer =async (
  player: mongoose.Document<unknown, any, IPlayer>, id: string) => {
  try{
    await Tournament.findOneAndUpdate({_id: id}, {$push: {players:player}})
  } catch(error) {
    throw error
  }
}
export const removePlayer =async (
  player: mongoose.Document<unknown, any, IPlayer>, id: string) => {
  try{
    await Tournament.findOneAndUpdate({_id: id}, {$pull: {players:player}})
  } catch(error) {
    throw error
  }
}