import { TTournament } from "./tournament";
import { TMatch } from "./match";

export type TRound = {
    _id?: string,
    tournament: TTournament,
    number: number,
    matches?:[ TMatch],
    
}