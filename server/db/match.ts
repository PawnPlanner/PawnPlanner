import mongoose, {Schema} from "mongoose";
import Player, { IPlayer } from "./player";

export interface IMatch {
    player1: IPlayer,
    player2: IPlayer,
    result: string,
}

const MatchSchema = new Schema<IMatch> (
    {
        player1: {
            type: Player,
            required: true,
        },
        player2: {
            type: Player,
            required: true,
        },
        result: {
            type: String,
            required: false,
        },
    }
);

const Match = mongoose.model<IMatch>("Match", MatchSchema);
export default Match