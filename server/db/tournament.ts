import mongoose, { Schema } from "mongoose";
import Player,{IPlayer} from "./player";

export interface ITournament {
    name: String;
    location: String,
    date: Date;
    rounds: Number;
    pairingSystem: String;
    players:[IPlayer];
}

const TournamentSchema = new Schema<ITournament>(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    rounds: {
      type: Number,
      required: true,
    },
    pairingSystem: {
      type: String,
      required: true,
    },
    players: {
        type: [Player],
        required:false,
    }
  },
  {
    timestamps: true,
  }
);

const Tournament = mongoose.model<ITournament>("Tournament", TournamentSchema);
export default Tournament;