import { TPlayer } from "./player";

export type TTournament = {
    _id?: string;
    name: string;
    location: string,
    date: Date | null;
    rounds: string;
    pairingSystem: string;
    players?:[TPlayer];
    owner:string;
};
  