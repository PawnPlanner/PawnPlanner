import mongoose, {Schema} from "mongoose";
import Tournament, { ITournament } from "./tournament";
import Match, { IMatch } from "./match";

export interface IRound {
    tournament: ITournament,
    number: number,
    matches:[IMatch],
}

const RoundSchema = new Schema<IRound> (
    {
        tournament: {
            type: Tournament,
            required: true,
        },
        number: {
            type: Number,
            required: true,
        },
        matches: {
            type: [Match],
            required: false,
        }
    }
);

const Round = mongoose.model<IRound>("Round", RoundSchema);
export default Round;