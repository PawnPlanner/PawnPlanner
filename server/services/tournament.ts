import mongoose from "mongoose";

// import packages
import { TokenPayload } from "google-auth-library";
import User, { IUser } from "../db/user";
import Tournament, {ITournament} from "../db/tournament";
import Player, {IPlayer } from "../db/player";

export const CreateTournament = async (
    newTournament: ITournament
): Promise<ITournament> => {
  const tournament = new Tournament({
    name: "tourney",
    rounds: 2,
    location:"Lafayette",
    pairingSystem: "Swiss",
    date: 11/11/2024,
  });

  return tournament;
};
