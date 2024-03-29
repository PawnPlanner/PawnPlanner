import { TTournament } from "./tournament";
import { TMatch } from "./match";

export type TRound = {
    
    number: number;
    matches?:[ TMatch];
    _id?: string;
}