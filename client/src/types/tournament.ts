import { TPlayer } from "./player";
import { TRound } from "./round";

export type TTournament = {
    _id?: string;
    name: string;
    location: string,
    date: Date | null;
    rounds: string;
    pairingSystem: string;
    players?:[TPlayer];
    owner:string;
    roundsArray?: [TRound];
};
  