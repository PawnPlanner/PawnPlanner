import mongoose, {Schema} from "mongoose";
import Player, { IPlayer } from "./player";

export interface IMatch {
    player1: IPlayer,
    player2: IPlayer,
    result: string,
    id: string,
   
}

const MatchSchema = new Schema<IMatch> (
    {
        player1: {
            type: {},
            required: true,
        },
        player2: {
            type: {},
            required: true,
        },
        result: {
            type: String,
            required: false,
        },
        id: {
            type: String,
            required: false
        }
       
    }
);

const Match = mongoose.model<IMatch>("Match", MatchSchema);
export default Match