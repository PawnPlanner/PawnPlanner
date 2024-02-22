import { TPlayer } from "./player";
export type TTournament = {
    _id?: string;
    name: string;
    location: string,
    date?: Date;
    rounds: string;
    pairingSystem: string;
    players?:[TPlayer];
  };
  
  export type TTournamentWrapper = {
    tournament: TTournament;
  };