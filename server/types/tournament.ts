import { TPlayer } from "./player";
import { TRound } from "./round";

export type TTournament = {
    _id?: string,
    name: string,
    location: string,
    date: Date,
    rounds: number,
    pairingSystem: string,
    players?: [TPlayer],
    owner: string,
    roundsArray: Array<string>,
    currentRound: number,
    isPrivate: boolean,
}