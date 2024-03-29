import mongoose, {Schema} from "mongoose";
import Tournament, { ITournament } from "./tournament";
import Match, { IMatch } from "./match";

export interface IRound {
    tournament: ITournament,
    number: number,
    matches:[IMatch],
    id: string,
}

const RoundSchema = new Schema<IRound> (
    {
        tournament: {
            type: {},
            required: true,
        },
        number: {
            type: Number,
            required: true,
        },
        matches: {
            type: [{}],
            required: false,
        },
        id: {
            type: String,
            required: false,
          },
    }
);

const Round = mongoose.model<IRound>("Round", RoundSchema);
export default Round;