import mongoose from "mongoose";

// import packages
import { TokenPayload } from "google-auth-library";
import User, { IUser } from "../db/user";
import Tournament, { ITournament } from "../db/tournament";
import Player, { IPlayer } from "../db/player";
import { TPlayer } from "../types/player";
import { TTournament } from "../types/tournament";

export const createtournament = async (
  newTournament: TTournament
): Promise<mongoose.Document<unknown, any, ITournament>> => {
  const tournament = new Tournament({
    name: newTournament.name,
    rounds: newTournament.rounds,
    location: newTournament.location,
    pairingSystem: newTournament.pairingSystem,
    date: newTournament.date,
    owner: newTournament.owner,
    currentRound: newTournament.currentRound,
    isPrivate: newTournament.isPrivate,
  });

  return tournament;
};

export const saveTournament = async (
  tournament: mongoose.Document<unknown, any, ITournament>
) => {
  try {
    const savedTournament = await tournament.save();

    return savedTournament;
  } catch (error) {
    throw error;
  }
};

export const fetchTournamentById = async (id: string) => {
  try {
    const tournament = await Tournament.findOne({ _id: id });
    return tournament;
  } catch (error) {
    throw error;
  }
}

export const fetchTournamentByRoundId = async (id: string) => {
  try {
    const tournament = await Tournament.findOne({ roundsArray: id });
    return tournament;
  } catch (error) {
    throw error;
  }
}

export const fetchTournamentByName = async (name: string) => {
  try {
    const tournament = await Tournament.findOne({ name: name });
    return tournament;
  } catch (error) {
    throw error;
  }
}

export const createPlayer = async (
  newPlayer: TPlayer
): Promise<mongoose.Document<unknown, any, IPlayer>> => {
  const player = new Player({
    name: newPlayer.name,
    rating: newPlayer.rating,
    points: newPlayer.points,
  });

  return player;
};

export const addPlayer = async (
  player: mongoose.Document<unknown, any, IPlayer>, id: string) => {
  try {
    const savedPlayer =  await player.save();
    await Tournament.findOneAndUpdate({ _id: id }, { $push: { players: player } })
    return savedPlayer;
  } catch (error) {
    throw error
  }
}
export const removePlayer = async (
  player: TPlayer, id: string) => {
  try {
    await Tournament.findOneAndUpdate({ _id: id }, {
      $pull: {
        players: {
          name: player.name,
          rating: player.rating,
          points: player.points
        }
      }
    })
  } catch (error) {
    throw error;
  }
}

export const updateTournament = async (
  tournament: TTournament
) => {
  try {
    await Tournament.findByIdAndUpdate(tournament._id, {
      name: tournament.name,
      rounds: tournament.rounds,
      location: tournament.location,
      date: tournament.date,
      pairingSystem: tournament.pairingSystem,
      players: tournament.players,
      owner: tournament.owner,
      currentRound: tournament.currentRound,
      isPrivate: tournament.isPrivate,
    });

  } catch (error) {
    throw error;
  }
}

export const deleteTournament = async (tournament: TTournament) => {
  try {
    await Tournament.findByIdAndDelete(tournament._id);
  } catch (error) {
    throw error;
  }
};

export const fetchTournamentByUser = async (user: string) => {
  try {
    const tournaments = await Tournament.find({ owner: user });
    return tournaments;
  } catch (error) {
    throw (error);
  }

}

export const byeRequest = async (
  player: TPlayer, id: string) => {
  try {
    await Tournament.findOneAndUpdate(
      {
        _id: id, "players.points": player.points,
        "players.name": player.name, "players.rating": player.rating
      },
      { $set: { "players.$.bye": true } })
  } catch (error) {
    throw error
  }
}

export const removeBye = async (
  player: TPlayer, id: string) => {
  try {
    await Tournament.findOneAndUpdate(
      {
        _id: id, "players.points": player.points,
        "players.name": player.name, "players.rating": player.rating
      },
      { $set: { "players.$.bye": false } })
  } catch (error) {
    throw error
  }
}

export const additionalPoints = async (
  player: TPlayer, points: number, id: string) => {
  try {
    await Tournament.findOneAndUpdate(
      {
        _id: id, "players.points": player.points,
        "players.name": player.name, "players.rating": player.rating
      },
      { $inc: { "players.$.points": 1 } })
  } catch (error) {
    throw error
  }
}

export const halfPoint = async (
  player: TPlayer, id: string) => {
  try {
    await Tournament.findOneAndUpdate(
      {
        _id: id, "players.points": player.points,
        "players.name": player.name, "players.rating": player.rating
      },
      { $inc: { "players.$.points": 0.5 } })
  } catch (error) {
    throw error
  }
}

export const fetchTournnamentsbyName = async (name: string) =>  {
  var regexp = new RegExp("^" + name);
  try {
    const tournaments = await Tournament.find({name: regexp});
    return tournaments;
  } catch(error) {
    console.error(error);
    throw error;
  }
};