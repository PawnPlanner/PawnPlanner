import { TTournament } from "./tournament";
import { TMatch } from "./match";

export type TRound = {
    _id?: string,
    number: number,
    matches?:[ TMatch],
    
}