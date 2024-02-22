import { TPlayer } from "./player";
export type TTournament = {
    name: string;
    location: string,
    date: Date;
    rounds: number;
    pairingSystem: string;
    players:[TPlayer];
  };
  
  export type TTournamentWrapper = {
    tournament: TTournament;
  };