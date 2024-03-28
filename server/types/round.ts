import { TTournament } from "./tournament";
import { TMatch } from "./match";

export type TRound = {
    tournament: TTournament,
    number: number,
    matches?:[ TMatch],
}