import { TPlayer } from "./player";
import { TRound } from "./round";

export type TMatch = {
    player1: TPlayer,
    player2: TPlayer,
    result?: string,
}